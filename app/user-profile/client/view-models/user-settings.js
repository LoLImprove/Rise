Template.UserSettings.hooks({
  rendered: function() {
    Session.set('user-settings:user-name-changed', false);
  }
});

Template.UserSettings.helpers({});

AutoForm.hooks({
  'user-settings-form': {
    // We normalize fields username, email, IGN and level_of_play according to the user schema
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      var self = this,
          set  = _.pick(updateDoc.$set, 'username', 'email', 'IGN', 'level_of_play'),
          query = {
            $set: {
              'username': set.username,
              'emails.0.address': set.email,
              'profile.level_of_play': set.level_of_play,
            }
          };

      if (!_.isUndefined(set.IGN)) {
        query.$set['profile.IGN'] = set.IGN;
      } else if (!_.isUndefined(updateDoc.$unset.IGN)) {
        query.$unset = { 'profile.IGN': updateDoc.$unset.IGN };
      }

      // If a password was provided:
      // First change it and then perform the update regardless of the result
      if (!_.isEmpty(insertDoc.password)) {
        Accounts.changePassword(insertDoc.currentPassword, insertDoc.password, function(e) {
          var changePasswordError = e;
          Meteor.users.update({ _id: Meteor.userId() }, query, function(e) {
            e = e || changePasswordError;
            if (!e && query.$set.username) {
              Session.set('user-settings:user-name-changed', true);
            }
            self.done(e);
          });
        });
      } else {
        Meteor.users.update({ _id: Meteor.userId() }, query, function(e) {
          if (!e && query.$set.username) {
            Session.set('user-settings:user-name-changed', true);
          }

          self.done(e);
        });
      }
      return false;
    },

    onSuccess: function(event, result, template) {
      // If the user changed his name we route him to his new profile
      if (Session.get('user-settings:user-name-changed')) {
        Router.go('profile', { username: Meteor.user().username });
      } else {
        template.$('input.password-field').val('');
        Rise.UI.Form.HideErrors(template);
      }
    },
    onError: function(event, error, template) {
      Rise.UI.Form.ShowError(template, error, { on: 'currentPassword' });
    }

  },
});
