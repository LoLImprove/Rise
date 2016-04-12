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
  Meteor.users.permit(['insert', 'update', 'remove']).ifLoggedIn().ifHasRole('admin').allowInClientCode();

  Collections.Replays.permit(['insert']).ifLoggedIn().allowInClientCode();
  Collections.Replays.permit(['update', 'remove']).ifLoggedIn().ifCurrentUserOwnsRessource().allowInClientCode();
  Collections.Replays.permit(['insert', 'update', 'remove']).ifLoggedIn().ifHasRole('admin').allowInClientCode();

  Collections.Analyses.permit(['insert']).ifLoggedIn().allowInClientCode();
  Collections.Analyses.permit(['update', 'remove']).ifLoggedIn().ifCurrentUserOwnsRessource().allowInClientCode();
  Collections.Analyses.permit(['insert', 'update', 'remove']).ifLoggedIn().ifHasRole('admin').allowInClientCode();

  Collections.GeneralNotes.permit(['insert']).ifLoggedIn().allowInClientCode();
  Collections.GeneralNotes.permit(['update', 'remove']).ifLoggedIn().ifCurrentUserOwnsRessource().allowInClientCode();
  Collections.GeneralNotes.permit(['insert', 'update', 'remove']).ifLoggedIn().ifHasRole('admin').allowInClientCode();

  Collections.TimelineEntries.permit(['insert']).ifLoggedIn().allowInClientCode();
  Collections.TimelineEntries.permit(['update', 'remove']).ifLoggedIn().ifCurrentUserOwnsRessource().allowInClientCode();
  Collections.TimelineEntries.permit(['insert', 'update', 'remove']).ifLoggedIn().ifHasRole('admin').allowInClientCode();

  Collections.Comments.permit(['insert']).ifLoggedIn().allowInClientCode();
  Collections.Comments.permit(['update', 'remove']).ifLoggedIn().ifCurrentUserOwnsRessource().allowInClientCode();
  Collections.Comments.permit(['insert', 'update', 'remove']).ifLoggedIn().ifHasRole('admin').allowInClientCode();
});
