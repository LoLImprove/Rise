AutoForm.addInputType("smartarea", {
  template: "AfSmartarea"
});

Template.AfSmartarea.hooks({
  created: function() {
    this.active      = new ReactiveVar(false);
    this.preventBlur = new ReactiveVar(false);
    this.showHelp    = new ReactiveVar(false);
  }
});

Template.AfSmartarea.helpers({
  submit: function() {
    return _.isUndefined(this.atts.submit) ? true : this.atts.submit;
  },
  active: function() {
    return Rise.UI.lookup('active').get() ? 'active' : '';
  },
  full: function() {
    return this.atts.full ? 'full' : '';
  },
  theme: function() {
    return this.atts.theme ? this.atts.theme : 'blue';
  },
  showHelp: function() {
    return Rise.UI.lookup('showHelp').get();
  }
});

Template.AfSmartarea.events({
  // After focus, use `mousedown` which triggers before blur
  'mousedown .help': function(event, template) {
    if (template.showHelp.get()) {
      template.active.set(true);
      template.showHelp.set(false);
      template.preventBlur.set(true);
    } else {
      template.showHelp.set(true);
      template.preventBlur.set(true);
    }
  },

  'focus textarea, blur textarea': function(event, template) {
    var el = template.$('textarea');

    // On focus
    if (event.type == 'focusin') {
      if (_.isUndefined(el.autosize)) {
        Meteor.defer(function() {
          autosize(el);
        });
      }
      template.active.set(true);
    // On Blur
    } else {
      if (!template.preventBlur.get()) {
        if (el.lines() <= 2){
          autosize.destroy(el);
        }

        template.active.set(false);
      }
    }

    template.preventBlur.set(false);

    return true;
  },
});
