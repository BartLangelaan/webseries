/**
 * Holds all SimpleSchema's that are attached to Collections
 * @type {Object.<string, SimpleSchema>}
 */
Schemas = {};

Schemas.History = new SimpleSchema({
    created: {
        blackbox: true,
        type: Object,
        autoValue: function(){
            if (this.isInsert) {
                return {
                    date: new Date,
                    user: Meteor.userId
                };
            } else {
                this.unset();
            }
        }
    },
    updated: {
        blackbox: true,
        type: [Object],
        autoValue: function(){
            return [{
                date: new Date,
                user: Meteor.userId
            }];
        }
    }
});

Schemas.Channels = new SimpleSchema({
    title: {
        type: String,
        label: "Naam van het kanaal",
        min: 2,
        max: 50,
        index:true,
        unique: true
    },
    slug: {
        type: String,
        min: 1,
        max: 30,
        index:true,
        unique: true
    },
    "youtube_channels": {
        type: [String],
        minCount: 1,
        min: 1,
        max: 50
    },
    history: {
        type: Schemas.History
    }
});