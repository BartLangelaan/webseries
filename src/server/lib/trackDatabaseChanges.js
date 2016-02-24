var initializing = true;

for(var collection_name in DB){

    if (DB.hasOwnProperty(collection_name) && collection_name != 'Changes') {

        // Observe collection and push changes to 'changes' collection
        DB[collection_name].find().observe({

            added: function (document) {
                if (initializing) return;
                DB.Changes.insert({
                    database: DB[collection_name]._name,
                    document_id: document._id,
                    type: 'added',
                    to: document,
                    date: new Date
                });
            },

            changed: function (newDocument, oldDocument) {
                DB.Changes.insert({
                    database: DB[collection_name]._name,
                    document_id: newDocument._id,
                    type: 'changed',
                    from: oldDocument,
                    to: newDocument,
                    date: new Date
                });
            },

            removed: function (document) {
                DB.Changes.insert({
                    database: DB[collection_name]._name,
                    document_id: document._id,
                    type: 'removed',
                    from: document,
                    date: new Date
                });
            }

        });
    }
}

initializing = false;