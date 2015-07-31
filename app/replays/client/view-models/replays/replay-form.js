Template.ReplayForm.helpers({
  formId: function() {
    if (this.type === 'update') {
      return 'replay-edit-form';
    } else {
      return 'replay-new-form';
    }
  },
  replay: function() {
    return this.replay;
  },
  type: function() {
    return this.type;
  },
  gameCharacters: function() {
    return Rise.Game.charactersAsOptions();
  },
  gameLanes: function() {
    return Rise.Game.lanesAsOptions();
  }
});

AutoForm.hooks({
  'replay-new-form': {
    formToDoc: function(doc) {
      doc.video_id = Youtube.Tools.getID(doc.video_id);
      Youtube.Tools.videoExists(doc.video_id, {
        loading: function() {
          // Display spinner
        },
        done: function() {
          // Remove spinner
        },
        success: function(id) {
          console.log('OK');
        },
        error: function(id) {
          console.log('NOT OK');
        }
      });

      return doc;
    }
  }
});
