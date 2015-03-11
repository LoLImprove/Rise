Rise.publish("rise:currentUser", function(id) {
  return Meteor.users.find({ _id: id }, { fields: { services: 0 }});
});
