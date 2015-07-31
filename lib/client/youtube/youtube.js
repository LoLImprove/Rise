Youtube = {};

Youtube.Credentials = {
  API_KEY: 'AIzaSyCCc2dXiybR5WruWb7IFfQmM-5inh2GwDI'
}

Youtube.Tools = {};

Youtube.Tools.getID = (function(url) {
  var rxp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  var match = url.match(rxp);
  if (_.isNull(match)) {
    return url;
  } else {
    return match[1];
  }
});

Youtube.Tools.callURL = (function(call, data, parts) {
  var url = "https://www.googleapis.com/youtube/v3/" + call + "?";
  var query = _.map(data, function(v, k) {
    return k + "=" + v;
  });
  url += query.join('&');
  url += "&key=" + Youtube.Credentials.API_KEY;
  url += "&part=" + parts;

  return url;

});
Youtube.Tools.videoExists = (function(id, callbacks) {
  callbacks.loading.call();
  $.ajax({
    type: 'GET',
    url: Youtube.Tools.callURL('videos', { id: id }, "snippet"),
    success: function(data) {
      if (data.pageInfo.totalResults > 0) {
        callbacks.success.call(id);
      } else {
        callbacks.error.call(id);
      }
      callbacks.done.call();
    },
    error: function(jqXhr) {
      callbacks.error.call(id);
      callbacks.done.call();
    }
  });
});
