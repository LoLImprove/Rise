Template.ReplayView.hooks({
  created: function() {
    return Session.set('replay:show-excerpt', true);
  },
  rendered: function() {
    $('.closed').slideUp();;
  }
});
Template.ReplayView.helpers({
  victory: function() {
    var victory = Rise.UI.get('victory');
    return victory ? 'victory' : 'defeat';
  },
  video_id: function() {
    return Rise.UI.get('video_id');
  },
  user: function() {
    return Meteor.users.findOne({ _id: Rise.UI.get('user_id') });
  },
  shortDescription: function() {
    return Session.get('replay:show-excerpt');
  }
});

Template.ReplayView.events({
  'click .edit-replay': function(event) {
    event.preventDefault();
    Session.set('replay:edit-mode', true);
  },
  'click .less, click .more': function(event) {
    event.preventDefault();
    shortDescription = Session.get('replay:show-excerpt');
    Session.set('replay:show-excerpt', !shortDescription);

    // Animation
    var description = $(event.currentTarget).siblings('.description');
    if (description.hasClass('closed')) {
      description.removeClass('closed');
      description.slideDown('slow');
    } else {
      description.slideUp('slow');
      description.addClass('closed');
    }
  }
});
