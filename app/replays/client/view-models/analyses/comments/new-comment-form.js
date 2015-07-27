Template.NewCommentForm.hooks({
  created: function() {
    this.focused = new ReactiveVar(false);
  }
});

Template.NewCommentForm.helpers({
  active: function() {
    return Template.instance().focused.get()? "active" : "";
  },
  formId: function() {
    // Lots of different comment forms in a page, and we need them to be unique for autoform
    // so... contextful UID (we don't want them to be random because it confuses autoform).
    data = Rise.UI.getParentData();

    if (this.type === "general_note") {
      var uid = data._id + "-general_note"
    } else {
      var uid = data._id + "-timeline_entry-" + data.timeline_entries.indexOf(this);
    }

    return 'new-comment-form-' + uid;
  }
});


Template.NewCommentForm.events({
  'focus .comment-input textarea': function(e) {
    e.preventDefault();
    Template.instance().focused.set(true);
  },
  'blur .comment-input textarea': function(e) {
    e.preventDefault();
    Template.instance().focused.set(false);
  }
});
// This is a bit ugly but autoform doesn't let us add hooks for multiple dynamic forms
// Instead we add a that runs on all forms and performs a match against a Regexp
// If it matches, we run the code
AutoForm.addHooks(null, {
  formToDoc: function(doc, ss, formId) {
    var newCommentFormRegEx = new RegExp('new-comment-form');

    if (formId.match(newCommentFormRegEx)) {
      // We lookup three contexts to find our current analysis,
      // not really readable and seems brittle
      var analysis = Rise.UI.getParentData(2),
      noteOrEntry = Rise.UI.getParentData();

      // Just checkin'
      if (analysis && noteOrEntry && Meteor.userId()) {
        doc.analysis_id = analysis._id;
        doc.parent_id = noteOrEntry._id;
        doc.parent_type = noteOrEntry.type;
        doc.user_id = Meteor.userId();
      }

    }

    return doc;
  },
}, false);
