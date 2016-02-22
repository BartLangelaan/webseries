if (Meteor.isClient) {
    Template.main.events({
        'click a.login': function(event){
            event.preventDefault();
            Meteor.loginWithGoogle({});
        },
        'click a.logout': function(event){
            event.preventDefault();
            Meteor.logout();
        }
    })
}

if (Meteor.isServer) {

}
