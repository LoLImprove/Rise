Notifications = new Meteor.Collection('notifications');

Notifications["new"] = function(doc) {
  if (_.isUndefined(doc.owner)) {
    console.error(Meteor.Error("CantNotify", "Can't notify, missing owner"));
  }
  return Notifications.insert(doc);
};

Notifications.readAll = function() {
  return Meteor.call('readAllNotifications');
};

Notifications.read = function(_id) {
  return Notifications.update(_id, {
    $set: {
      read: true
    }
  });
};

var NotificationsSchema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  from: {
    type: String,
    optional: true
  },
  link: {
    type: String,
    optional: true
  },
  data: {
    type: Object,
    blackbox: true,
    optional: true
  },
  title: {
    type: String
  },
  read: {
    type: Boolean,
    defaultValue: false
  },
  date: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  icon: {
    type: String,
    defaultValue: 'circle-o'
  },
  "class": {
    type: String,
    defaultValue: 'default'
  }
});

Notifications.attachSchema(NotificationsSchema);
