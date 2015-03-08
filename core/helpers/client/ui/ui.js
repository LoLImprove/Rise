Rise.UI = Rise.UI || {}

Rise.UI.WaitOnData = (function(templateInstance, callback) {
  templateInstance.autorun(function(a) {
    var data = Template.currentData(templateInstance.view);
    if(!data) return;
    callback.call(templateInstance, data);
  });

});

/* Rise.UI.getData, gets the data for the current view context
 * It will try to get the template data (reactive)
 * If failing it will fallback to blaze or iron:controller (not so reactive)
 */
Rise.UI.getData = (function() {
  if (Template.currentData()) {
    return Template.currentData();
  } else if (UI.getData()) {
    return UI.getData();
  } else if (Iron.controller && Iron.controller.data) {
    console.log('View context not found, data loaded from controller');
    return data;
  } else {
    return null;
  }
});

Rise.UI.getParentData = (function(level) {
  if (Template.instance()) {
    return Template.instance().parent(level).data;
  }
});

/* Rise.UI.lookup,
 *   -  Similar to Rise.get() but look up through the ancestor chain until the value is found in a template's data (or not);
 *   - You can use composed keys to access nested elements (see examples)
 *
 * Examples:
 *
 *   Rise.UI.lookup('replay_id')
 *   Rise.UI.lookup('timeline_entries.0.content')
 *   Rise.UI.lookup('timeline_entries.0.content', 1) // Second arg is the maximum level of lookup in the ancestor chain. 0 will lookup only in the current template data.
 *
 * Returns the value or `undefined`
 *
 */
Rise.UI.lookup = (function(key, maxLevel, curLevel) {
  var curLevel = curLevel || 0;
  var maxLevel = (maxLevel === 0) ? 0 : (maxLevel || 15); // cuz 0 is falsy

  result = Rise.Runtime.chain(Template.parentData(curLevel), key).get();

  if (result) {
    return result;
  } else if (curLevel < maxLevel && !_.isNull(Template.parentData(curLevel))) {
    return Rise.UI.lookup(key, maxLevel, curLevel + 1);
  } else {
    return undefined; // Not really necessary
  }
});

/* Rise.UI.get, get a property from Rise.UI.getData after if the data has been loaded  */
Rise.UI.get = (function(fieldOrHelperName) {
  var data = Rise.UI.getData();
  if (data) {
    var result = data[fieldOrHelperName];
    if (!_.isUndefined(result)) {
      // If field is a helper we call it passing it he data context
      if (_.isFunction(result)) {
        return result.call(data);
      } else {
        return result;
      }
    } else {
      console.error('Could not find key ', fieldOrHelperName, 'in', data);
    }
  }

  return null;
});
