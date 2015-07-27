Template.ProfileNavbar.helpers({
  isActive: function(menuState) {
    return (Session.get('rise:user-profile:state') === menuState) ? 'active' : '';
  }
});

Template.ProfileNavbar.events({
  'click .profile-goto': function(e) {
    e.preventDefault();
    var newState = $(e.currentTarget).data('goto');
    Session.set('rise:user-profile:state', newState);
  }
});
