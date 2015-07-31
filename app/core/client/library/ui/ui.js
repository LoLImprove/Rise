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
 *   -  Looks up through the ancestor chain until the desired key is found in a template's properties;
 *   - You can use composed keys to access nested elements (see examples)
 *   - If you are looking for a key located in a data's template use { in: data }
 *
 * Arguments:
 *
 *   - key: The key to search for as a String. Can be composed. (i.e: 'timeline_entries.0.content')
 *   - opts: Options in an Object.
 *           - in: A specific property of the template in which you want to search for the key
 *           - maxLevel: Number of parents template to lookIn. 0 will only lookup in the current template.
 *
 *
 * Examples:
 *
 *   Rise.UI.lookup('expanded') // Retrieves the first 'expanded' property found on a template object.
 *
 *   Rise.UI.lookup('replay_id', { in: 'data' })
 *   Rise.UI.lookup('timeline_entries.0.content', { in: 'data' })
 *   Rise.UI.lookup('timeline_entries.0.content', { maxLvel: 1 }) // Second arg is the maximum level of lookup in the ancestor chain. 0 will lookup only in the current template data.
 *
 * Returns the value or `undefined`
 *
 */
Rise.UI.lookup = (function(key, opts, curLevel) {
  var opts     = opts || {};
  var curLevel = curLevel || 0;
  var lookUpon = _.isNull(Template.instance()) ? Template.instance() : Template.instance().parent(curLevel);

  opts.maxLevel = (opts.maxLevel === 0) ? 0 : (opts.maxLevel || 15); // cuz 0 is falsy

  // If no template could be found
  if (_.isNull(lookUpon)) {
    return undefined;
  }

  if (opts.in) {
    lookUpon = lookUpon[opts.in];
    if (_.isNull(lookUpon) || _.isEmpty(lookUpon) || _.isUndefined(lookUpon)) {
      return undefined;
    }
  }

  var result = Rise.Runtime.chain(lookUpon, key).get();

  if (_.isUndefined(result) && curLevel < opts.maxLevel ) {
    return Rise.UI.lookup(key, opts, curLevel + 1);
  } else if (curLevel < opts.maxLevel) {
    return result;
  }
});

/* Rise.UI.get, get a property from Rise.UI.getData after if the data has been loaded
 *
 * Similar to `Rise.UI.lookup(simpleKey, { in: 'data', maxLevel: 0 })` only if the key is a method, it will be called.
 * Also it does not handle composed keys.
 *
 * Returns the value or null; */
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
