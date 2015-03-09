Template.EditAnalysis.hooks({
  rendered: function() {
    this.$('textarea').first().focus();
    Rise.UI.Scroll.to('analysis-edit-form');
  }
});
Template.EditAnalysis.events({
  'click .cancel-edit-analysis': function(e) {
    e.preventDefault();
    Session.set('replay:edit-current-analysis', false);
  }
});
