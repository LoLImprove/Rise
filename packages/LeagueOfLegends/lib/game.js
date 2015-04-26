Rise = Rise || {};
Rise.Game = {
  name: 'League Of Legends',
  pkgName: 'league-of-legends',
  assetsPathFor: function(img){
    return '/packages/' + this.pkgName + '/assets/images/' + img;
  },
  characterPicture: function(character) {
    var character = _.str.capitalize(character);
    var picName = _.contains(this.Characters, character) ? character : 'Unknown';

    return this.assetsPathFor(picName + '.png');
  }
};
