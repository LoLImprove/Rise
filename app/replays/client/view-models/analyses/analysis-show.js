Template.AnalysisShow.hooks({
  created: function() {
    this.expanded = new ReactiveVar(true);
    Session.set('replay:edit-current-analysis', false);
  },
  rendered: function() {
    var firstId = Rise.Analyses.findOne({ replay_id: Rise.UI.getParentData()._id, user_id: { $not: Meteor.userId() } })._id;

    isFirst = firstId == Rise.UI.get('_id');
    isNotOwner = Rise.UI.get('user_id') !== Meteor.userId()
    isPermalink = !_.isUndefined(Router.current().params.analysis_id);
    if (isNotOwner && !isPermalink && !isFirst) {
      this.expanded.set(false);
    }
  }
});

// Context must be analysis, ofc
Template.AnalysisShow.helpers({
  user: function() {
    return Meteor.users.findOne({ _id: Rise.UI.get('user_id') });
  },
  isEditing: function() {
    if (Meteor.userId() && (Rise.UI.get('user_id') === Meteor.userId())) {
      return Session.get('replay:edit-current-analysis');
    } else {
      return false;
    }
  },
  expanded: function() {
    return Rise.UI.lookup('expanded').get();
  },
  toggleExpansionText: function() {
    return Rise.UI.lookup('expanded').get() ? 'Collapse' : 'Expand';
  },
  permalinkData: function() {
    return { _id: Rise.UI.get('replay_id'), analysis_id: Rise.UI.get('_id') }
  }
});

Template.AnalysisShow.events({
  'click .edit-analysis': function() {
    Session.set('replay:edit-current-analysis', true);
  },
  'click .toggle-analysis-vote': function() {
    Meteor.call('rise:toggleVoteFor', 'analysis', Rise.UI.get('_id'));
  },
  'click .toggle-expansion': function(e) {
    e.preventDefault();
    var expanded = Rise.UI.lookup('expanded');
    expanded.set(!expanded.get());
  }
});
