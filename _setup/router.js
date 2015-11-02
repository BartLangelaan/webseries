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
    this.route('/', {
        name: 'home',
        subscriptions: function(){
            return Meteor.subscribe("Channels_most_viewed")
        },
        data: function(){

        }
    });
    this.route('/login', {
        name: 'login'
    });
    this.route('/add', {
        name: 'channel.add'
    });

    this.route('/:channel', {
        name: 'channel.show',
        data: searchData
    });
    this.route('/:channel/season-:season', {
        name: 'season',
        data: searchData
    });
});


