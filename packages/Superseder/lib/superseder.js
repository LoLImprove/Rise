Superseder = (function() {
  var SchemaSuperseder = function(){ this.schemas = {}; };
  SchemaSuperseder.prototype.supersede = SchemaSuperseder.prototype.override = function(on, name) {
    if (!_.isUndefined(this.schemas[name])) {
      on[name] = this.schemas[name];
    } else {
      console.log('Schema override `' + name + '` not found, keeping default.');
    }
  };

  SchemaSuperseder.prototype.registerSupersede = SchemaSuperseder.prototype.registerOverride = function(name, schema) {
    this.schemas[name] = schema;
  };

  var TemplateSuperseder = function(){};
  TemplateSuperseder.prototype.supersede = TemplateSuperseder.prototype.override = function(overriden, opts) {
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

  return {
    Template: new TemplateSuperseder,
    Schema: new SchemaSuperseder
  };
}());
