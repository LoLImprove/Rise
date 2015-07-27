Template.ReplayView.hooks({
  created: function() {
    Session.set('replay:is-analyzing', false);
    Session.set('replay:show-excerpt', true);
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
  },
  isEditing: function() {
    if (Meteor.userId()) {
      var currentAnalysis = Rise.Analyses.findOne({ replay_id: Rise.UI.get('_id'), user_id: Meteor.userId() });
      if (currentAnalysis) {
        return Session.get('replay:edit-current-analysis');
      } else {
        return false; // Useless I guess I should remove it. Too lazy to.
      }
    }
  },
  isAnalyzing: function() {
    if (Meteor.userId()) {
      return Session.get('replay:is-analyzing');
    } else {
      return false;
    }
  },
  // TODO: Refactor, duplicated in analysis-view.js
  currentUserAnalysis: function() {
    return Rise.Analyses.findOne({ replay_id: Rise.UI.get('_id'), user_id: Meteor.userId() });
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
  },
  'click .start-analysis': function(event) {
    event.preventDefault();
    Session.set('replay:is-analyzing', true);
    Rise.Player.play();
  },
  'click .edit-analysis': function(event) {
    event.preventDefault();
    Session.set('replay:edit-current-analysis', true);
  },

  'click .edit-general-note': function(event) {
    event.preventDefault();
    Rise.Player.pause();

    Rise.UI.Scroll.to('.analysis-form');
    $('.analysis-form textarea').first().focus();
  },
  'click .add-timeline-entry': function(event) {
    event.preventDefault();
    Rise.Player.pause();

    // We click on the autoform add item button
    $('.analysis-form .autoform-add-item').trigger('click');

    // We wait for the click + redraw, otherwise the new timeline entry fields are not displayed yet
    Meteor.setTimeout(function() {
      var group = $('.analysis-form .list-group-item:nth-last-child(2)');
      Rise.UI.Scroll.to('#' + group.attr('id'));
      group.find('textarea').first().focus();
    }, 150);

  }

});
