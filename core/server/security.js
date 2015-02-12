Security.defineMethod("ifHasUserSomeId", {
  fetch: ['_id'],
  deny: function (type, arg, userId, _id) {
    console.log(type, arg, userId, _id);
    return userId !== arg;
  }
});

Rise.Replays.permit(['insert']).ifLoggedIn().ifHasUserSomeId('hello').apply();
