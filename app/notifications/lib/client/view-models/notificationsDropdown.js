Template.notificationsDropdown.hooks({
  created: function() {
    Session.set('notifications:show', false);
    this.subscribe("notifications");
  }
});

Template.notificationsDropdown.helpers({
  notificationClass: function() {
    if (!this.read) {
      return 'unread-notification';
    } else {
      return '';
    }
  },
  ago: function() {
    return moment(this.date).fromNow();
  },
  notificationFrom: function() {
    return Meteor.users.findOne(this.from);
  },
  profileLinkData: function() {
    return { username: Meteor.users.findOne(this.from).username };
  },
  dropdownVisible: function() {
    return Session.get('notifications:show');
  },
  dropdownIcon: function() {
    if (this.icon) {
      return this.icon;
    } else {
      return 'bell';
    }
  },
  dropdownIconEmpty: function() {
    if (this.iconEmpty) {
      return this.iconEmpty;
    } else {
      return 'bell-o';
    }
  },
  hasNotifications: function() {
    return Notifications.find().count() > 0;
  }
});

Template.notificationsDropdown.events({
  'click .notification-toggle': function(e, template) {
    Session.set('notifications:show', !Session.get('notifications:show'));
  },
  'click .notification': function() { Notifications.read(this._id) }
});
