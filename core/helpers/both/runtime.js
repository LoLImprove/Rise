/*
 * De-stringifies a method chain
 *
 * Example:
 *
 *   Rise.Runtime.chain(window, 'history.back');
 *
 *   Returns an object
 *   {
 *     chain: window.history.back // the method as a Function object
 *     context: window.history // the method's context
 *     call: func() // A Function that calls the method chain
 *   }
 *
 *   You can then do : Rise.Runtime.chain(window, 'history.back').call();
 */
Rise.Runtime = {
  chain: function(base, chain) {
    var chainAry = chain.split('.');
    var fullChain = base;
    var context = base;

    _.each(chainAry, function(link, index) {
      if (fullChain[link]) {
        // We set the context to the last evaluated link
        // Example : `window.history.back`, context will be `window.history`
        context = (index === chainAry.length - 1) ? fullChain : context;
        fullChain = fullChain[link];
      } else {
        throw new Meteor.Error(404, "Could not find method: `." + chain + "`, " + link + " is missing");
      }
    });

    return {
      chain: fullChain,
      context: context,
      call: function() {
        return this.chain.call(this.context);
      }
    };
  }
}
