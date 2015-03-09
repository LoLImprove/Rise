Template.RisePlayer.hooks({
  created: function() {
    // We set Rise.Player to the current template instance
    Rise.Player.init(this);

    this.playerTime = { h: "00", m: "00", s: "00" };
    this.reactivePlayerTime = new ReactiveVar(this.playerTime);
    this.playerStatus   = new ReactiveVar("unloaded");
5  }
});

Template.RisePlayer.helpers({
  // Is triggered each time the video_id is changd
  videoPlayer: function() {
    var el = $('.rise-replay-container')[0];
    var videoContainer = Rise.UI.Buffer.get('rise:player:container');

    // Remove the video player element if it exists
    if (videoContainer) {
      // Seems not to work properly and not removing the DOM object
      Blaze.remove(videoContainer);
      // Thus we use jQuerty to ensure it.
      $('#rise-player').remove();
    }

    // If the container exists, render the player inside the container
    if (el) {
      var instance = Blaze.renderWithData(Template.RiseVideoContainer, { id: this.valueOf() }, el);
      // We keep track of the current player container so we can remove it later on
      Rise.UI.Buffer.set('rise:player:container', instance);
    }

  },
  // Player is running if paused or started
  isRunning: function() {
    var status = Template.instance().playerStatus.get()
    return  (status === "started") || (status === "paused");
  },
  isAnalyzingOrEditing: function() {
    return Session.get('replay:is-analyzing') || Session.get('replay:edit-current-analysis');
  }
});

Template.RisePlayer.events({
  'click .edit-general-note': function(e) {
    e.preventDefault();
  },

  'click .add-timeline-entry': function(e) {
    e.preventDefault();
  }
});

Template.RiseVideoContainer.hooks({
  rendered: function() {
    // Sets up the youtube player
    var self = this;

    if ( Rise.UI.doesElementExists('#rise-player') ) {
      // Custom jQuery plugin
      $('#rise-player').yannotate({
        videoId: this.data.id,
        dimensions: 'relative',
        onPlayerReady: function() {
          self.parent().playerStatus.set("loaded");
        },
        onPlayerStarted: function() {
          self.parent().playerStatus.set("started");
        },
        onPlayerStopped: function(time) {
          self.parent().playerStatus.set("paused");
          self.parent().playerTime = time;
          self.parent().reactivePlayerTime.set(time);
        }
      });
    }
  }
});
