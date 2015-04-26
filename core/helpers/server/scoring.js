Rise.Scoring = (function() {
  var Scoring = function() {
    this.table = Rise.Config.load('score-table')['score-table'];
  }

  /* opts: { to: userIdOrUserObject, for: "analysis:insert" }
    - to: The user we add points to, must be an id or an user object
    - for: The key for the point count in the score-table
  */
  Scoring.prototype.addPoints = function(opts) {
    var to  = opts.to,
        key = opts.for;

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
        Meteor.users.update({_id: userId}, { $inc: { 'life_points': parseInt(points) } });
      } else {
      throw new Meteor.Error('ScoringError', 'Could not find ' + key + 'in score table.');
      }
    } else {
      throw new Meteor.Error('ScoringError', 'Wrong user parameter must be an id or a user object.');
    }

  };

  return new Scoring;
}());
