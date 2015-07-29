AutoForm.addInputType("smartarea", {
  template: "AfSmartarea"
});

Template.AfSmartarea.hooks({
  created: function() {
    this.active = new ReactiveVar(false);
  },
  rendered: function() {
    autosize(this.$('textarea'));
  }
});

Template.AfSmartarea.helpers({
  active: function() {
    return Rise.UI.lookup('active').get() ? 'active' : '';
  },
  full: function() {
    return this.atts.full ? 'full' : '';
  },
  theme: function() {
    return this.atts.theme ? this.atts.theme : 'blue';
  }
});

Template.AfSmartarea.events({
  'focus textarea, blur textarea': function(event, template) {
    template.active.set(!template.active.get());

    var el = template.$('textarea');

    if (event.type == 'focusin') {
      if (_.isUndefined(el.autosize)) {
        Meteor.defer(function() {
          autosize(el);
        });
      }
    } else {
      if (el.lines() <= 2){
        autosize.destroy(el);
      }
    }
  }
});
