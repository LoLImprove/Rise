/*
 * Options
 *   - dimensions : 'default' | 'relative' | 'widthxheight'
 *     Example : { dimensions: '1024x768' }
 *
 *     If 'relative' is chosen, the dimensions will
 *     vary according to the screen size
 *
 *
 *   - videoId : the id of the Youtube Video as a String.
 *     Example : { videoId: 'cEA7YFDGumY' }
 */
$.fn.yannotate = function(opts) {
  new window._Yannotate(this, opts);
  return this;
}

Yannotate = window._Yannotate = (function(playerElement, opts) {
  this.opts = opts;

  YoutubeAPI.loadVideoById(this.opts.videoId);
  YoutubeAPI.setPlayerElement(playerElement[0]);

  // Callback
  YoutubeAPI.onPlayerStarted = this.opts.onPlayerStarted;

  this.setVideoDimensions();

  if (YoutubeAPI.ready && YoutubeAPI.player === undefined) {
    YoutubeAPI.createPlayer();
  }
});

Yannotate.prototype.setVideoDimensions = (function() {
  if (this.opts.dimensions === undefined || this.opts.dimensions == 'default') {
    YoutubeAPI.scale(600, 800);
  } else if (this.opts.dimensions == 'relative') {
    YoutubeAPI.scale(((screen.height / 1.19936170213) / 1.65), ((screen.width / 1.37142857143) / 1.65));
    //    YoutubeAPI.scale(screen.height / 1.40625, screen.width / 1.875);
  } else if (dimensions = this.opts.dimensions.match(/(\d+)(?:\*|x)(\d+)/)) {
    YoutubeAPI.scale(dimensions[2], dimensions[1]);
  }

});
