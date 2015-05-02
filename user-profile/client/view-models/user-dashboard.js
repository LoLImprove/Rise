Template.UserDashboard.helpers({
  percentTillNextRank: function() {
    var neededForNextRank = Rise.Scoring.pointsNeededForRank(this.rank + 1);
    var totalTillNext = neededForNextRank - Rise.Scoring.pointsNeededForRank(this.rank);
    var remainingExp = neededForNextRank - this.life_points;
    var whatWeAlreadyGot = totalTillNext - remainingExp;

    return whatWeAlreadyGot * 100 / totalTillNext;

  },
  commentsCountFor: function(record) {
    return record.comments().count();
  },
  permalinkData: function() {
    return { _id: Rise.UI.get('replay_id'), analysis_id: Rise.UI.get('_id') }
  }
});
