Rise = Rise || {};
Rise.Game = {
  name: 'League Of Legends',
  pkgName: 'league-of-legends',
  platformName: 'LoLImprove',
  assetsPathFor: function(img){
    return '/packages/' + this.pkgName + '/assets/images/' + img;
  },
  characterPicture: function(character) {
    var character = _.str.capitalize(character);
    var picName = _.contains(this.Characters, character) ? character : 'Unknown';

    return this.assetsPathFor(picName + '.png');
  },
  charactersAsOptions: function() {
    return _.map(this.Characters, function(character) {
      return {
        "label": "<strong>" + character + "</strong>",
        "value": character
      }
    });
  },
  lanesAsOptions: function() {
    return _.map(this.Lanes, function(lane) {
      return {
        "label": "<strong>" + lane + "</strong>",
        "value": lane
      }
    });
  }
};
