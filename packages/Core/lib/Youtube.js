import YoutubeIframeAPI from './youtube/iframe-api.js';

var Yannotate = (function(playerElement, api, opts) {
  this.opts = opts;
  this.api = api;

  this.api.loadVideoById(this.opts.videoId);
  this.api.setPlayerElement(playerElement);
  this.api.player = undefined; // Reset if it was already set by the API onload method;

  // Callbacks through options or default
  this.api.onPlayerReady = this.opts.onPlayerReady || this.api.onPlayerReady;
  this.api.onPlayerStarted = this.opts.onPlayerStarted || this.api.onPlayerStarted;
  this.api.onPlayerStopped = this.opts.onPlayerStopped || this.api.onPlayerStopped;

  this.setVideoDimensions();

  if (this.api.ready && this.api.player === undefined) {
    this.api.createPlayer();
  }
});

Yannotate.prototype.setVideoDimensions = (function() {
  if (this.opts.dimensions === undefined || this.opts.dimensions == 'default') {
    this.api.scale(600, 800);
  } else if (this.opts.dimensions == 'relative') {
    this.api.scale(((screen.height / 1.19936170213) / 1.65), ((screen.width / 1.37142857143) / 1.65));
    //    YoutubeAPI.scale(screen.height / 1.40625, screen.width / 1.875);
  } else if (dimensions = this.opts.dimensions.match(/(\d+)(?:\*|x)(\d+)/)) {
    this.api.scale(dimensions[2], dimensions[1]);
  }
});


const Youtube = {
  Credentials: {
    API_KEY: 'AIzaSyCCc2dXiybR5WruWb7IFfQmM-5inh2GwDI'
  },

  DOM: {
    Player(element, opts) {
      if (Meteor.isServer) throw new Error("Can't call Youtube.DOM on the server");

      if (window.YoutubeIframeAPI) {
        var YoutubeAPI = window.YoutubeIframeAPI
      } else {
        var YoutubeAPI = window.YoutubeIframeAPI = new YoutubeIframeAPI();
      }

      if (YoutubeAPI.ready) {
        YoutubeAPI.createPlayer();
      } else {
        YoutubeAPI.onReady((api) => {
          api.createPlayer();

          new Yannotate(element, api, opts);
        });
      }

      return YoutubeAPI;
    }
  },

  Tools: {
    getURL(id) {
      return `https://www.youtube.com/watch?v=${id}`;
    },
    getID(url) {
      if (_.isUndefined(url) || _.isNull(url)) {
        return '';
      } else {
        var rxp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
        var match = url.match(rxp);
        if (_.isNull(match)) {
          return url;
        } else {
          return match[1];
        }
      }
    },

    callURL(call, data, parts) {
      var url = "https://www.googleapis.com/youtube/v3/" + call + "?";
      var query = _.map(data, function(v, k) {
        return k + "=" + v;
      });
      url += query.join('&');
      url += "&key=" + Youtube.Credentials.API_KEY;
      url += "&part=" + parts;

      return url;
    },

    resourceExists(id, callbacks) {
      let success = callbacks.success || function() {};
      let error = callbacks.error || function() {};
      let done = callbacks.done || function() {};

      // Minimum length for youtube id, if not valid return imediately
      if (id.length < 11) {
        error.call(id);
        return;
      }

      callbacks.loading.call();
      $.ajax({
        type: 'GET',
        url: Youtube.Tools.callURL('videos', { id: id }, "snippet"),
        success: function(data) {
          if (data.pageInfo.totalResults > 0) {
            success.call(id);
          } else {
            error.call(id);
          }

          done.call();
        },
        error: function(jqXhr) {
          error.call(id);
          done.call();
        }
      });
    }
  } // Tools
};

export default Youtube;
