Meteor.publishComposite("notifications", function() {
  return {

    find: function() {
      return Notifications.find({ owner: this.userId });
    },
    // Notification's user from FROM
    children: [
      // analyses
      {
        find: function(notification) {
          return Meteor.users.find({ _id: notification.from });
        }
      }
    ]
  }
});
