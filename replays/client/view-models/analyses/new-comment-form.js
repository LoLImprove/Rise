Template.NewCommentForm.helpers({
  formId: function() {
    // Lots of different comment forms in a page, so... UUID.
    return 'new-comment-form-' + Meteor.uuid();
  }
});

// This is a bit ugly but autoform doesn't let us add hooks for multiple dynamic forms
// Instead we add a that runs on all forms and performs a match against a Regexp
// If it matches, we run the code
AutoForm.addHooks(null, {
  formToDoc: function(doc, ss, formId) {
    var UUIDRegEx = "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}";
    var newCommentFormRegEx = new RegExp('new-comment-form-' + UUIDRegEx);

    if (formId.match(newCommentFormRegEx)) {
      // We lookup three contexts to find our current analysis,
      // not really readable and seems brittle
      var analysis = Rise.UI.getParentData(2),
      noteOrEntry = Rise.UI.getParentData();

      // Just checkin'
      if (analysis && noteOrEntry && Meteor.userId()) {
        doc.parent_id = analysis._id;
        doc.parent_type = noteOrEntry.type;
        doc.user_id = Meteor.userId();
      }

      return doc;
    }
  },
}, false);

// Regular hooks
AutoForm.hooks({
  'comment-new-form': {
    onSuccess: function(operation, id, template) {
      console.log('Comment created !');
      // TODO: Do something ? Animate maybe ?
    },
    onError: function(operation, error, template) {
      console.error('Trying to create a new comment but there was an error on ' + operation + ':', error);
    },
  }
});
