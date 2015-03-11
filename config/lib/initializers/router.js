Router.configure({
  layoutTemplate: 'Layout',
  loadingTemplate: 'Loading',
  notFoundTemplate: '404',

  /*load: function() {
    $('html, body').animate({ scrollTop: 0 }, 400);
    $('.content').hide().fadeIn(1000)
  },*/
  waitOn: function() {
    return Meteor.subscribe('rise:currentUser', Meteor.userId());
  }

})
