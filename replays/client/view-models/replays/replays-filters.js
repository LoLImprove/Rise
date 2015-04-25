// TODO: I18n
Template.ReplaysFilters.helpers({
  gameResult: function() {
    return [
      { label: "All", value: "null" },
      { label: "Victory", value: "true" },
      { label: "Defeat", value: "false" }
    ];
  },
  champions: function() {
    return ["All"].concat(Rise.Game.Characters);
  },
  lanes: function() {
    return ["All", "Mid", "Top", "Bot", "Jungle"];
  }
});

Template.ReplaysFilters.events({
  'change .replays-filters input, change .replays-filters select': function(e, t) {
    var filter = $(e.currentTarget);
    var filterName = filter.data('filter');
    var mustConvertValue = filter.data('convert');
    var pagination = Rise.UI.lookup('paginatedReplays', { in: 'data' });

    var value = filter.val();

    if (mustConvertValue) {
      value = convertType(value);
    } else {
      value = value === 'All' ? null : value; // If we selected 'all' we remove the filter
    }

    pagination.setFilter(filterName, value);
  }
});

var convertType = (function(value){
  var v = Number (value);
  return !isNaN(v) ? v :
    value === "undefined" ? undefined
    : value === "null" ? null
    : value === "true" ? true
    : value === "false" ? false
    : value
});
