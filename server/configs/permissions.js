import * as Collections from '/lib/collections.js';

export default (function() {
  Security.defineMethod("ifIsCurrentUser", {
    fetch: [],
    deny: function (type, arg, userId, doc) {
      return userId !== doc._id;
    }
  });

  Security.defineMethod("ifCurrentUserOwnsRessource", {
    deny: function (type, arg, userId, object) {
      return userId !== object.user_id;
    }
  });

  Meteor.users.permit(['update']).ifLoggedIn().ifIsCurrentUser().onlyProps(['username', 'emails', 'profile']).allowInClientCode();

  // Only loggedin user can create replays
  Collections.Replays.permit(['insert']).ifLoggedIn().allowInClientCode();
  // Makes sure user can only update or remove his own replays
  Collections.Replays.permit(['update']).ifLoggedIn().ifCurrentUserOwnsRessource().allowInClientCode();
  Collections.Replays.permit(['remove']).ifLoggedIn().ifCurrentUserOwnsRessource().allowInClientCode();

  // Only logged in user can post analysis
  // Collections.Analyses.permit(['insert']).ifLoggedIn().apply();
  // Makes sure a user can only update his own analyses
  // Collections.Analyses.permit(['update']).ifLoggedIn().ifCurrentUserOwnsRessource().apply();
  // Collections.Analyses.permit(['remove']).ifLoggedIn().ifCurrentUserOwnsRessource().apply();

  // Only logged in user can post analysis
  // Collections.Comments.permit(['insert']).ifLoggedIn().apply();
  // Makes sure a user can only update his own analyses
  // Collections.Comments.permit(['update']).ifLoggedIn().ifCurrentUserOwnsRessource().apply();

});
