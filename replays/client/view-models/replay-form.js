Template.ReplayForm.helpers({
  formId: function() {
    if (this.type === 'update') {
      return 'replay-edit-form';
    } else {
      return 'replay-new-form';
    }
  },
  doc: function() {
    return this.doc;
  },
  type: function() {
    return this.type;
  }
});
