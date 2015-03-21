Template.notificationsDropdown.hooks({
  created: function() {
    this.isDropdownVisible = new ReactiveVar(false);
    this.subscribe("notifications");
  }
});

Template.notificationsDropdown.helpers({
  notificationClass: notificationClass,
  dropdownVisible: function() {
    return Template.instance().isDropdownVisible.get();
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
    console.log(template.isDropdownVisible.get());
    template.isDropdownVisible.set(!template.isDropdownVisible.get());

  },
  'click .notification': Notifications.read(this._id)
});

var notificationClass = function() {
  if (!this.read) {
    return 'unread-notification';
  } else {
    return '';
  }
};
