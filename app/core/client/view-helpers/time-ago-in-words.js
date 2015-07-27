// If an object is passed, tries to get the updated_at, if non existent gets the created_at
// Else format the given date
Template.registerHelper('TimeAgoInWords', function(obj) {
  if (_.isDate(obj)) {
    return moment(obj).fromNow();
  } else {
    var date = obj.updated_at || obj.created_at
    if (!_.isUndefined(date)) {
      return moment(date).fromNow();
    }
  }
});
