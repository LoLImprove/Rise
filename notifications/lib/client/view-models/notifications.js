Template.notifications.hooks({
  created: function() {
    this.subscribe("notifications");
  }
});

Template.notifications.helpers({
  notificationClass: notificationClass,
  ago: function() {
    return moment(this.date).fromNow();
  }
});

Template.notifications.events({
  'click .notification': Notifications.read(this._id)
});

var notificationClass = function() {
  if (!this.read) {
    return 'unread-notification';
  } else {
    return '';
  }
};
