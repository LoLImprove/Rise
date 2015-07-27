Template.notifications.hooks({
  created: function() {
    this.subscribe("notifications");
  }
});

Template.notifications.helpers({
  notificationClass: notificationClass,
  ago: function() {
    return moment(this.date).fromNow();
  },
  notificationFrom: function() {
    return Meteor.users.findOne(this.from);
  },
  profileLinkData: function() {
    return { username: Meteor.users.findOne(this.from).username };
  }
});

Template.notifications.events({
  'click .notification': function() { Notifications.read(this._id) }
});

var notificationClass = function() {
  if (!this.read) {
    return 'unread-notification';
  } else {
    return '';
  }
};
