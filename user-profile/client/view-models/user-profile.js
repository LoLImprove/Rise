Template.UserProfile.hooks({
  created: function() {
    Session.set('rise:user-profile:state', 'dashboard');
  },
  rendered: function() {
    this.$('#user-profile-container').modal({ backdrop: 'static' });
  },
  destroyed: function() {
    this.$('#user-profile-container').modal('hide');
  }
});

Template.UserProfile.helpers({
  isCurrentUser: function() {
    return Rise.UI.get('_id') === Meteor.userId();
  },
  profileState: function() {
    if (Rise.UI.get('_id') === Meteor.userId()) {
      return 'User' + _.str.capitalize(Session.get('rise:user-profile:state'));
    } else {
      return 'UserDashboard';
    }
  }
});

Template.UserProfile.events({
  'click .close-modal': function(e) {
    e.preventDefault();
    Router.back();
  }
});
