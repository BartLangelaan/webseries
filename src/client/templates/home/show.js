Template.home.helpers({
    most_viewed_channels: Queries.Channels.most_viewed(),
    getChannelPathData: function(){
        return {
            channel: this.slug
        }
    }
});