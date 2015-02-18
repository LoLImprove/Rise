Template.registerHelper('isOwner', function() {
  return Template._isOwner;
});

// Alias
Template.registerHelper('isOwnerOf', function() {
  return Template._isOwner;
});

/* Just checks the passed argument against Meteor.userId() :
 * - If the argument is a string, checks against it,
 * - If the argumtn is an object, checks against the 'user_id' key.
 */
Template._isOwner.helpers({
  isOwner: function() {
    if (_.isString(this.valueOf())) {
      return Meteor.userId() == this.valueOf();
    } else {
      return Meteor.userId() == this.user_id;
    }
  }
});
