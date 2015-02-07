Template.RisePlayer.helpers({
  videoPlayer: function() {
    var el = $('.rise-replay-container')[0];
    var videoContainer = Rise.UI.Buffer.get('rise:player:container');

    if (videoContainer) {
      // Seems not to work properly and not removing the DOM object
      // Thus we use jQuerty to ensure it.
      Blaze.remove(videoContainer);
      $('#rise-player').remove();
    }

    if (el) {
      var instance = Blaze.renderWithData(
        Template.RiseVideoContainer,
        { id: this.valueOf() },
        el
      );

      Rise.UI.Buffer.set('rise:player:container', instance);
      console.log('videoContainer rendered', this);
    }

  }
});

Template.RiseVideoContainer.rendered = function() {
  console.log('Getting player container...');
  console.log(this, Rise.UI.Buffer.get('rise:player:container'));
  setUpPlayer(this.data.id);
}

var setUpPlayer = (function(video_id) {
  if ( Rise.UI.doesElementExists('#rise-player') ) {
    console.log(video_id);
    $('#rise-player').yannotate({
      videoId: video_id,
      dimensions: 'relative',
      onPlayerStarted: function() {
        console.log('player started');
      }
    });
  }
});
