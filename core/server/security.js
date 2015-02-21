Security.defineMethod("ifCurrentUserOwnsRessource", {
  deny: function (type, arg, userId, object) {
    return userId !== object.user_id;
  }
});

// Only loggedin user can create replays
Rise.Replays.permit(['insert']).ifLoggedIn().apply();
// Makes sure user can only update his own replays
Rise.Replays.permit(['update']).ifLoggedIn().ifCurrentUserOwnsRessource().apply();

// Only logged in user can post analysis
Rise.Analyses.permit(['insert']).ifLoggedIn().apply();
// Makes sure a user can only update his own analyses
Rise.Analyses.permit(['update']).ifLoggedIn().ifCurrentUserOwnsRessource().apply();
