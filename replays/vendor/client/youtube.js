/*
 * Public: Youtube Iframe API Object
 */

var YoutubeIframeAPI = window._YoutubeIframeAPI = (function() {
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
YoutubeIframeAPI.prototype.onPlayerReady = (function(event) {
});

/*
 * Private: Callback called when the player's state changes
 */
YoutubeIframeAPI.prototype.onPlayerStateChange = (function(event) {
  switch(event.data) {
  case YT.PlayerState.ENDED:
    //
    break;
  case YT.PlayerState.PLAYING:
    YoutubeAPI.onPlayerStarted();
    break;
  case YT.PlayerState.PAUSED:
    //
    break;
  case YT.PlayerState.BUFFERING:
    //
    break;
  case YT.PlayerState.CUED:
      //
    break;
  }
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
        'onReady': this.onPlayerReady,
        'onStateChange': this.onPlayerStateChange
      }
    });
  }
});

// When the Youtube Iframe API is loaded, a global variable is set.
window.onYouTubeIframeAPIReady = function() {
  YoutubeAPI.ready = true;
  YoutubeAPI.createPlayer();
};


// Bootstraps the Youtube API and the player

window.YoutubeAPI = new window._YoutubeIframeAPI();
