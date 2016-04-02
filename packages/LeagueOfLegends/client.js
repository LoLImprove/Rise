import _ from 'lodash';
import ranks from './data/ranks';
import lanes from './data/lanes';
import characters from './data/characters';

const Game = {
  name: 'League Of Legends',
  pkgName: 'league-of-legends',
  platformName: 'LoLImprove',
  data: {
    ranks,
    lanes,
    characters
  },
  lib: {

    assetsPathFor(folder, img){
      return '/packages/' + Game.pkgName + '/assets/images/' + folder + '/' + img;
    },
    characterPicture(character) {
      character = _.isString(character) ? _.capitalize(character) : '';
      var picName = _.includes(Game.data.characters, character) ? character : 'Unknown';

      return Game.lib.assetsPathFor('characters', picName + '.png');
    },
    lanePicture(lane) {
      var picName = "Unknown";

      lane = _.isString(lane) ? _.capitalize(lane) : '';

      // If lane exists
      if (_.includes(Game.data.lanes, lane)) {
        // If we have a lane and it's bot we determine either bot or supp
        if (!_.isEmpty(lane) && (/^bot/i).test(lane)) {
          picName = (/support/i).test(lane) ? "Support" : "Bot";
        } else {
          picName = lane;
        }
      } 

      return Game.lib.assetsPathFor('lanes', picName + '.png');
    }
    
  }
};

export default Game;
