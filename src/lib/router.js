/** Set base template */
Router.configure({
    layoutTemplate: 'main'
});

/** Make sure the name of the route == the name of the template */
Router.setTemplateNameConverter(function (str) {
    return str;
});

/**
 * Returns the data from the Database, if required
 */
function searchData(){
    var data = {};
    var channel = this.params.channel;
    var show = this.params.show;

    if(channel)
        data.channel = DB.Channels.findOne({slug: channel});

    if(show)
        data.show = DB.Shows.findOne({slug: show});

    return data;
}

Router.map(function(){

    // Homepage
    this.route('/', {
        name: 'home',
        subscriptions: function(){
            return Meteor.subscribe("Channels_most_viewed")
        },
        data: function(){

        }
    });

    // Specific pages
    this.route('/login', {
        name: 'login'
    });

    // Channel pages
    this.route('/channels/new', {
        name: 'channel.add',
        template: 'add',
        data: {
            collection: "DB.Channels"
        }
    });
    this.route('/channels/:channel', {
        name: 'channel',
        data: searchData
    });

    // Show pages
    this.route('/channels/:channel/shows/add', {
        name: 'show.add',
        template: 'add',
        data: {
            collection: "DB.Shows"
        }
    });
    this.route('/channels/:channel/shows/:show', {
        name: 'show',
        data: searchData
    });

    // Show pages
    this.route('/channels/:channel/shows/:show/seasons/add', {
        name: 'season.add',
        template: 'add',
        data: {
            collection: "DB.Seasons"
        }
    });
    this.route('/channels/:channel/shows/:show/seasons/:season', {
        name: 'season',
        data: searchData
    });

    // Episode pages
    this.route('/channels/:channel/shows/:show/seasons/:season/episodes/add', {
        name: 'episode.add',
        template: 'add',
        data: {
            collection: "DB.Episodes"
        }
    });
    this.route('/channels/:channel/shows/:show/seasons/:season/episodes/:episode', {
        name: 'episode',
        data: searchData
    });
});


