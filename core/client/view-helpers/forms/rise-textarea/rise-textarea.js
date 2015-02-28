Template.RiseTextarea.hooks({
  rendered: function() {
    if (this.data.focus) {
      this.$('textarea').focus();
    }
  }
});
