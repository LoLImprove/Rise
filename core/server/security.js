Security.defineMethod("ifHasUserSomeId", {
  fetch: ['_id'],
  deny: function (type, arg, userId, _id) {
    console.log(type, arg, userId, _id);
    return userId !== arg;
  }
});

Rise.Replays.permit(['insert']).ifLoggedIn().apply();
// TODO : Make sure user can only update his own replay
Rise.Replays.permit(['update']).ifLoggedIn().apply();
