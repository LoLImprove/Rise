import _ from 'lodash';
import ranks from './data/ranks';
import lanes from './data/lanes';
import characters from './data/characters';

const Game = {
  name: 'League Of Legends',
  platformName: 'LoLImprove',
  data: {
    ranks,
    lanes,
    characters
  },
  lib: {
    pkgName: 'league-of-legends',

    assetsPathFor: function(img){
      return '/packages/' + this.pkgName + '/assets/images/' + img;
    },
    characterPicture: function(character) {
      if (_.isString(character)) {
        character = _.str.capitalize(character);
      } else {
        character = "";
      }
      var picName = _.contains(Game.data.Characters, character) ? character : 'Unknown';

      return this.assetsPathFor(picName + '.png');
    },
    charactersAsOptions: function() {
      return _.map(Game.data.Characters, function(character) {
        return {
          "label": "<strong>" + character + "</strong>",
          "value": character
        };
      });
    },
    lanesAsOptions: function() {
      return _.map(Game.Data.Lanes, function(lane) {
        return {
          "label": "<strong>" + lane + "</strong>",
          "value": lane
        };
      });
    }
    
  }
};

export default Game;
