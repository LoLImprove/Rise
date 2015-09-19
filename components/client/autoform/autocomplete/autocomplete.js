Template.registerHelper('afAutocomplete', function() {
  return Template.afAutocomplete;
});

/*
 * When displaying pictures, the picture handler must reference
 * a Function and can be passed two ways:
 *
 *   - As a String, it will then be checked against the global `window` object
 *     For instance pictureHandler="Rise.Game.characterPicture".
 *
 *   - As a Function, it will then be used as is.
 *
 */
Template.afAutocomplete.hooks({
  created: function() {
    this.topSuggestion = new ReactiveVar(undefined);
    if (this.data.withPictures) {
      if (_.isString(this.data.pictureHandler)) {
        this.source = Rise.Runtime.chain(window, this.data.pictureHandler);
      } else {
        this.source = this.data.pictureHandler;
      }
    }
  }
});

Template.afAutocomplete.helpers({
  currentChoice: function() {
    return Rise.UI.lookup("topSuggestion").get();
  },
  hasPictureClass: function() {
    return this.withPictures ? 'has-picture' : '' ;
  },
  picturePath: function() {
    var handler = Rise.UI.lookup('source'),
        choice  = Rise.UI.lookup("topSuggestion").get();
    return handler.call(choice);
  },
  typeaheadOptions: function() {
    return {
      autoselect: true
    };
  }
});

Template.afAutocomplete.events({
  'keyup input': function(event, template) {
    var tab = 9, arrowDown = 40, arrowUp = 38, enter = 13;

    if (_.contains([tab, arrowDown, arrowUp, enter], event.which)) {
      /*if (event.which == tab || event.which == arrowDown || event.which == arrowUp || event.which == enter) {*/
      template.$('.tt-input').trigger('change');
    } else {
      template.topSuggestion.set(template.$('.tt-suggestion').first().text());
    }
  },
  // As we don't have access to typeahead events (probably because of the third party plugin), we trigger the "select" ourselves
  'click .tt-dropdown-menu': function(event, template) {
    template.$('.tt-input').trigger('change');
  },

  'change input, blur input': function(event, template) {
    var choice = $(event.currentTarget).val();
    // We check the choice against the options, which are of the form { label: ..., value: ... }
    var choiceValid = _.where(template.data.options, { value: choice }).length > 0;

    if (choiceValid) {
      // If the choice is valid we reset the current top suggestion to this value
      template.topSuggestion.set(choice);
    } else {
      // If the choice is invalid we take the top suggestion;
      $(event.currentTarget).typeahead('val', template.topSuggestion.get());
    }
  }
});
