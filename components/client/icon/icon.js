var icon = FlowComponents.define('icon', function(props) {
  this.iconName = props.icon;
  this.show = props.when;
  this.explanation = props.explanation;

  // Reactive internal state
  this.set("showHelp", false);

  this.map = {
    'tick': '&#10004;',
    'bang': '!',
    'cross': '&#10008;'
  };

});

icon.state.show = function() {
  return this.show;
};

icon.state.iconName = function() {
  return this.iconName;
};

icon.state.icon = function() {
  return Spacebars.SafeString(this.map[this.iconName]);
};

icon.state.explanation = function() {
  return this.explanation;
};

icon.action.toggleHelp = function() {
  if (this.explanation) {
    this.set("showHelp", !this.get("showHelp"));
  }
};

Template.icon.events({
  'mouseenter .icon-component, mouseleave .icon-component': function() {
    FlowComponents.callAction('toggleHelp');
  }
});
