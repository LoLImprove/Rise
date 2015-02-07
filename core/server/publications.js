Rise.publish("rise:users", function () {
  return Meteor.users.find();
});
