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
    return _.map(Rise.Game.Characters, function(character) {
      return {
        "label": "<strong>" + character + "</strong>",
        "value": character
      }
    });
  }
});
