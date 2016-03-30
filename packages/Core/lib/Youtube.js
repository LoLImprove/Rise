const Youtube = {
  Credentials: {
    API_KEY: 'AIzaSyCCc2dXiybR5WruWb7IFfQmM-5inh2GwDI'
  },

  Tools: {
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

    videoExists(id, callbacks) {
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
