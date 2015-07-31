Template.registerHelper('afAutocomplete', function() {
  return Template.afAutocomplete;
});

Template.afAutocomplete.hooks({
  created: function() {
    this.topSuggestion = new ReactiveVar(undefined);
  }
});

Template.afAutocomplete.helpers({
  typeaheadOptions: function() {
    return {
      autoselect: true
    };
  }
});

Template.afAutocomplete.events({
  'keyup input': function(event, template) {
    template.topSuggestion.set(template.$('.tt-suggestion').first().text());
  },
  'blur input': function(event, template) {
    $(event.currentTarget).typeahead('val', template.topSuggestion.get());
  },
});
