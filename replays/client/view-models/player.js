Template.RisePlayer.helpers({
  // Is triggered each time the video_id is changd
  videoPlayer: function() {
    var el = $('.rise-replay-container')[0];
    var videoContainer = Rise.UI.Buffer.get('rise:player:container');

    // Remove the video player element if it exists
    if (videoContainer) {
      // Seems not to work properly and not removing the DOM object
      // Thus we use jQuerty to ensure it.
      Blaze.remove(videoContainer);
      $('#rise-player').remove();
    }

    // If the container exists, render the player inside the container
    if (el) {
      var instance = Blaze.renderWithData(Template.RiseVideoContainer, { id: this.valueOf() }, el);
      // We keep track of the current player container so we can remove it later on
      Rise.UI.Buffer.set('rise:player:container', instance);
    }

  }
});

Template.RiseVideoContainer.rendered = function() {
  // Sets up the youtube player
  if ( Rise.UI.doesElementExists('#rise-player') ) {
    // Custom jQuery plugin
    $('#rise-player').yannotate({
      videoId: this.data.id,
      dimensions: 'relative',
      onPlayerStarted: function() {
        console.log('player started');
      }
    });
  }
}
