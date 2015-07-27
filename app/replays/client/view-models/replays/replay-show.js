Template.ReplayShow.hooks({
  created: function() {
    Session.set('replay:edit-mode', false);
    Session.set('replay:current-instance', null);
  },
  rendered: function() {
    // Because replay:current-instance is used in the edit form
    // to keep the ReplayView up to date
    Rise.UI.WaitOnData(this, function(data) {
      Session.set('replay:current-instance', data);
    });
  }
});

Template.ReplayShow.helpers({
  replay: function() {
    // If we are in edit-mode we return the current replay instance
    // which holds the value while editing, it's not a mongo object anymore though
    if (Session.get('replay:edit-mode') === true) {
      return Session.get('replay:current-instance');
    } else {
      return this;
    }
  },
  isEditMode: function() {
    return Session.get('replay:edit-mode');
  }
});
