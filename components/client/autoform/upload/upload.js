AutoForm.addInputType("file", {
  template: "afFileUploader"
});

Template.afFileUploader.hooks({
  rendered: function() {
    this.$('input').nicefileinput();
  }
});
