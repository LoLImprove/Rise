Template.RisePlayer.rendered = function() {
  $('#rise-player').yannotate({
    videoId: this.data.video_id,
    dimensions: 'relative',
    onPlayerStarted: function() {
      console.log('player started');
    }
  });
}
