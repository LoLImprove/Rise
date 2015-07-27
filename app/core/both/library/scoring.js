Rise.Scoring = (function() {
  var Scoring = function() {
    if (Meteor.isServer) {
      this.table = Rise.Config.load('score-table')['score-table'];
    }
    /*
    this.table = {
      'user:registration': 500,
      'analysis:insert': 100,
      'replay:insert': 20,
      'comment:insert': 10
    }*/
  }

  if (Meteor.isServer) {
    /* opts: { to: userIdOrUserObject, for: "analysis:insert" }
       - to: The user we add points to, must be an id or an user object
       - for: The key for the point count in the score-table
    */

    Scoring.prototype.addPoints = function(opts) {
      var to  = opts.to,
      key = opts.for,
      userId = null;

      if (to && opts.for) {
        if (_.isObject(to)) {
          userId = to._id;
        } else if(_.isString(to)) {
          userId = to;
        } else {
          userId = null;
        }
      }

      if (!_.isNull(userId)) {
        var points = this.table[key];
        if (this.table[key]) {
          var user = Meteor.users.findOne({_id: userId});
          points = this.computePoints(user, parseInt(points));
          var rank = this.recomputeRank(user, points);
          Meteor.users.update({_id: userId}, { $set: { 'rank': rank }, $inc: { 'life_points': points } });
        } else {
          throw new Meteor.Error('ScoringError', 'Could not find ' + key + 'in score table.');
        }
      } else {
        throw new Meteor.Error('ScoringError', 'Wrong user parameter must be an id or a user object.');
      }

    };

    // Earning points is based on the current rank
    // Making it harder after rank 50 and even more after the 150th,
    // mostly a linear func until 150 though
    Scoring.prototype.computePoints = function(user, basePoints) {
      var rank = user.rank || 1;
      var baseCoeff = 0.1894736842105263;
      var rankCoeff = Math.floor(rank / 10);
      var coeff = 1;
      var polarity = basePoints > 0 ? 1 : -1;
      var score = 0;

      if (rank < 10) {
        score = basePoints + (rank * 10);
      } else if (rank < 20) {
        coeff =  baseCoeff * rankCoeff;
        score = Math.ceil(rank * basePoints * coeff);
      } else if (rank < 50) {
        coeff = baseCoeff * (1 + (rankCoeff * 0.1));
        score = Math.ceil(rank * basePoints * coeff);
      } else if (rank < 150) {
        coeff =  baseCoeff * (1 - (rankCoeff * 0.03));
        score = Math.ceil(rank * basePoints * coeff);
      } else {
        coeff = baseCoeff * (rankCoeff * 0.01);
        score = Math.ceil(rank * basePoints * coeff);
      }

      return score * polarity;
    };

    Scoring.prototype.recomputeRank = function(user, points) {
      var newTotal = user.life_points + points
      // ~ Linear experience curve
      return Math.floor(((Math.sqrt(100 * (2 * newTotal + 25) ) + 50) / 100)) ;
    };

    // Gives points to an user until max point count is reach
    Scoring.prototype.debug = function(userId, _for, max) {
      Meteor.users.update({_id:userId}, { $set: { rank: 1, life_points: 0 } });
      var user = Meteor.users.findOne(userId);
      var oldRank = user.rank;
      var oldExp = user.life_points;
      var i = 0;
      var total = 0;
      while (user.life_points < max) {
        this.addPoints({ to: userId, for: _for });
        i++;
        total++;
        user = Meteor.users.findOne(userId);
        if (user.rank > oldRank) {
          console.debug('Earned level', user.rank, ', after: ', i, ' analyses, total: ', total);
          i = 0;
          oldRank = user.rank;
          oldExp = user.life_points;
        }
      }
    };
  } /* /Meteor.isServer */

  Scoring.prototype.pointsNeededForRank = function(rank) {
    return (Math.pow(rank, 2) + rank) / 2 * 100 - (rank * 100)
  };

  Scoring.prototype.howMuchLeftUntillNextRank = function(user){
    var totalExp = this.pointsNeededForRank(user.rank + 1);
    var userExp = user.life_points;
    return totalExp - userExp;
  }

  return new Scoring;
}());
