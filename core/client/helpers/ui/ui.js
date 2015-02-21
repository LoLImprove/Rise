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
