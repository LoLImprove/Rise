Template.AnalysisShow.hooks({
  created: function() {
    this.expanded = new ReactiveVar(true);
    Session.set('replay:edit-current-analysis', false);
  },
  rendered: function() {
    isNotOwner = Rise.UI.get('user_id') !== Meteor.userId()
    if (isNotOwner) {
      this.expanded.set(false);
    }
  }
});
Template.AnalysisShow.events({
  'click .edit-analysis': function() {
    Session.set('replay:edit-current-analysis', true);
  },
  'click .toggle-expansion': function(e) {
    e.preventDefault();
    var expanded = Rise.UI.lookup('expanded');
    expanded.set(!expanded.get());
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
  }
});
