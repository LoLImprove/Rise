Template.EditAnalysis.events({
  'click .cancel-edit-analysis': function(e) {
    e.preventDefault();
    Session.set('replay:edit-current-analysis', false);
  }
});
