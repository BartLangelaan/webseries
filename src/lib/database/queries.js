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