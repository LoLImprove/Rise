/* Using null object pattern to avoid firing errors when the video player is not yet loaded */
Rise.Player = {
  init: function(template) {
    this.template = template;
  },
  get: function(key, opts) {
    if (this.template) {
      var valueWrapper = this.template[key],
          value = null;

      if (!_.isUndefined(valueWrapper.get)) {
        value = this.template[key].get();
      } else {
        value = valueWrapper.valueOf();
      }

      if (opts.formatTime) {
        return value.m + ":" + value.s;
      } else {
        return value;
      }
    } else {
      throw new Meteor.Error(404, "Rise.Player template not found");
    }
  },
  play: function() {
    this.player().playVideo();
  },
  player: function() {
    if (YoutubeAPI && YoutubeAPI.player) {
      return YoutubeAPI.player
    } else {
      return this._nullPlayer();
    }
  },
  _nullPlayer: function() {
    this.__nullPlayer = this.__nullPlayer || this.__createNullPlayer();
    return this.__nullPlayer;
  },
  __createNullPlayer: function() {
    return new NullObject()
      .method('playVideo')
      .method('stopVideo')
      .create();
  }
}
