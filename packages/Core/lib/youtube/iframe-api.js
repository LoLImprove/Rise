if (Meteor.isClient) {
  /*
   * Public: Youtube Iframe API Object
   */

  YoutubeIframeAPI = (function() {
    // Loads Youtube IFrame Player API asynchronously.
    var  firstScriptTag = document.getElementsByTagName('script')[0],
        tag            = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.video = {};
    this.ready = false;
  });

  /*
   * Private: Callback called when the player is ready
   */
  YoutubeIframeAPI.prototype.onPlayerReady = (function(api) {
    return (function(event) {
      if (api && api.whenPlayerReady) {
        api.whenPlayerReady(event);
      }
    });
  });

  /* Empty callbacks */
  YoutubeIframeAPI.prototype.onPlayerStarted = (function(event) {});
  YoutubeIframeAPI.prototype.onPlayerStopped = (function(event) {});

  /*
   * Private: Callback called when the player's state changes
   */
  YoutubeIframeAPI.prototype.onPlayerStateChange = (function(api) {
    return (function(event) {
      switch(event.data) {
      case YT.PlayerState.ENDED:
        api.onPlayerStopped(api, event);
        break;
      case YT.PlayerState.PLAYING:
        api.onPlayerStarted(api, event);
        break;
      case YT.PlayerState.PAUSED:
        var time = api.helpers.secondsToTime(api.player.getCurrentTime());
        api.onPlayerStopped(api, event, time);
        break;
      case YT.PlayerState.BUFFERING:
        //
        break;
      case YT.PlayerState.CUED:
        //
        break;
      }
    });
  });

  YoutubeIframeAPI.prototype.stopOnClick = (function(element) {
    var self = this;

    $(element).on('click', function() {
      self.player.stopVideo();
    })
  });

  YoutubeIframeAPI.prototype.loadVideoById = (function(id) {
    this.video.id = id;
  });


  YoutubeIframeAPI.prototype.setPlayerElement = (function(el) {
    this.video.element = el;
  });

  YoutubeIframeAPI.prototype.scale = (function(height, width) {
    this.video.height = height;
    this.video.width = width;
  });

  YoutubeIframeAPI.prototype.helpers = {
    secondsToTime: function(secs) {
      /*secs = Math.round(secs);
       var hours = Math.floor(secs / (60 * 60));
       var divisor_for_minutes = secs % (60 * 60);
       var minutes = Math.floor(divisor_for_minutes / 60);
       var divisor_for_seconds = divisor_for_minutes % 60;
       var seconds = Math.ceil(divisor_for_seconds);*/
      var seconds = Math.floor(secs),
          hours = Math.floor(seconds / 3600);
      seconds -= hours*3600;
      var minutes = Math.floor(seconds / 60);
      seconds -= minutes*60;

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}

      return { "h": hours, "m": minutes, "s": seconds };
    }
  }

  YoutubeIframeAPI.prototype.createPlayer = (function() {
    if (this.video.id) {
      this.player = new YT.Player(this.video.element.id, {
        height: this.video.height,
        width: this.video.width,
        videoId: this.video.id,
        playerVars: {
          autohide: 1,
          wmode: 'transparent',
          theme: 'light'
        },
        events: {
          'onReady': this.onPlayerReady(this),
          'onStateChange': this.onPlayerStateChange(this)
        }
      });
    }
  });

  YoutubeIframeAPI.prototype.onReady = (function(cb) {
    var self = this;

    window.onYouTubeIframeAPIReady = function() {
      self.ready = true;
      cb(self);
    };

  });
  // When the Youtube Iframe API is loaded, a global variable is set.


  // Bootstraps the Youtube API and the player
  // window.YoutubeAPI = new window._YoutubeIframeAPI();
} else {
  // is server
  YoutubeIframeAPI = (function() {});
}

export default YoutubeIframeAPI;
