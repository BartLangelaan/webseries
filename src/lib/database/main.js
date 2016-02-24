DB.Channels.attachSchema(Schemas.Channels);

for(var collection_name in DB){

    if (DB.hasOwnProperty(collection_name) && collection_name != 'Changes') {

        // Allow everything if authenticated
        DB[collection_name].allow({
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
    }
}