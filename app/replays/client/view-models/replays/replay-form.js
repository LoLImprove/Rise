Template.ReplayForm.hooks({
  created: function() {
    this.checkingVideoExists = new ReactiveVar(false);
    this.currentVideoID      = new ReactiveVar(undefined);
    this.videoValid          = new ReactiveVar(false); // I know but only
    this.videoNotValid       = new ReactiveVar(false); // because it's easier
  }
});

Template.ReplayForm.helpers({
  formId: function() {
    if (this.type === 'update') {
      return 'replay-edit-form';
    } else {
      return 'replay-new-form';
    }
  },
  // Just used to pass over the method to Autoform Autocomplete
  characterPicture: function() {
    return Rise.Game.characterPicture;
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
  },
  checkingVideoExists: function() {
    return Rise.UI.lookup('checkingVideoExists').get();
  },
  videoValid: function() {
    return Rise.UI.lookup('videoValid').get();
  },
  videoNotValid: function() {
    return Rise.UI.lookup('videoNotValid').get();
  }
});

Template.ReplayForm.events({
  'blur .video-id': function(event, template) {
    // If we have a video ID we check against the Youtube API
    if (!_.isUndefined(template.currentVideoID.get())) {
      Youtube.Tools.videoExists(template.currentVideoID.get(), {
        loading: function() {
          template.videoValid.set(false);
          template.videoNotValid.set(false);
          template.checkingVideoExists.set(true);
        },
        done: function() {
          // UX
          setTimeout(function() {
            template.checkingVideoExists.set(false);
          }, 250);
        },
        success: function(id) {
          // UX
          setTimeout(function() {
            template.videoValid.set(true);
            template.videoNotValid.set(false);
          }, 350);
        },
        error: function(id) {
          // UX
          setTimeout(function() {
            template.videoValid.set(false);
            template.videoNotValid.set(true);
          }, 350);
        }
      });
    }
  }
});

AutoForm.hooks({
  'replay-new-form': {
    formToDoc: function(doc) {
      console.log('formtodoc', doc);
      doc.video_id = Youtube.Tools.getID(doc.video_id);
      Rise.UI.lookup('currentVideoID', { base: this.template }).set(doc.video_id);

      return doc;
    }
  }
});
