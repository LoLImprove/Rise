Superseder = (function() {
  var Superseder = function() {
    this.supersededTemplates = [];
  }

  Superseder.prototype.supersede = Superseder.prototype.override = function(overriden, opts) {
    Meteor.startup(function() {
      var overridenName = overriden;
      _with = opts.with;

      if (_.isUndefined(Template[_with])) {
        throw new Meteor.Error("Wrong Argument", "Wrong template for `with` option : " + _with + " .");
      }

      replacement = Template[_with];
      overriden   = Template[overriden];

      replacement.replaces(overridenName);
      // It seems to be reversed but it is perfectly normal because of the way template.replaces() works, see https://github.com/aldeed/meteor-template-extension/blob/master/template-extension.js#L82
      overriden.inheritsHelpersFrom(_with);
      overriden.inheritsEventsFrom(_with);
      overriden.inheritsHooksFrom(_with);

    });
  };


  return new Superseder;
})();
