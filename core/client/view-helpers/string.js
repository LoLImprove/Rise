Template.registerHelper('capitalize', function(string) {
  return _.str.capitalize(string);
});

Template.registerHelper('upcase', function(string) {
  return string.toUpperCase();
});
