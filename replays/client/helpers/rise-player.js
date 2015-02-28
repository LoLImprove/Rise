/* Using null object pattern to avoid firing errors when the video player is not yet loaded */
Rise.Player = {
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
