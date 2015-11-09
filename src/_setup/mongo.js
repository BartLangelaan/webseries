/**
 * Holds all Collections
 * @type {Object.<name, Mongo.Collection>}
 */
DB = {};
DB.Channels = new Mongo.Collection('channels');
DB.Shows = new Mongo.Collection('shows');
DB.Seasons = new Mongo.Collection('seasons');
DB.Episodes = new Mongo.Collection('episodes');
DB.Changes = new Mongo.Collection('changes');

/**
 * Holds all queries that are published
 * @type {{name: {name: Function}}}
 */
Queries = {
    Channels: {
        most_viewed: function(){
            return DB.Channels.find({});
        }
    }
};

/**
 * Publish all queries
 */
if(Meteor.isServer){
    Meteor.publish("Channels_most_viewed", Queries.Channels.most_viewed);
}



var initializing = true;

for(var collection_name in DB){

    if (DB.hasOwnProperty(collection_name) && collection_name != 'Changes') {

        var collection = DB[collection_name];


        // Allow everything if authenticated
        collection.allow({
            insert: function (userID) {
                return (userID && !userID.banned);
            },
            update: function (userID) {
                return (userID && !userID.banned);
            },
            remove: function (userID) {
                return (userID && !userID.banned);
            }
        });

        if (Meteor.isServer) {

            // Observe collection and push changes to 'changes' collection
            collection.find().observe({

                added: function (document) {
                    if (initializing) return;
                    DB.Changes.insert({
                        database: collection._name,
                        document_id: document._id,
                        type: 'added',
                        to: document,
                        date: new Date
                    });
                },

                changed: function (newDocument, oldDocument) {
                    DB.Changes.insert({
                        database: collection._name,
                        document_id: newDocument._id,
                        type: 'changed',
                        from: oldDocument,
                        to: newDocument,
                        date: new Date
                    });
                },

                removed: function (document) {
                    DB.Changes.insert({
                        database: collection._name,
                        document_id: document._id,
                        type: 'removed',
                        from: document,
                        date: new Date
                    });
                }

            });


        }
    }
}

initializing = false;