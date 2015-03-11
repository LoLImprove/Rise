Meteor.startup(function () {
  /* Needed for youtube iframes */
  BrowserPolicy.content.allowOriginForAll('http://*.googleapis.com');
  BrowserPolicy.content.allowOriginForAll('http://*.gstatic.com');
  BrowserPolicy.content.allowOriginForAll('https://www.youtube.com/');
  BrowserPolicy.content.allowOriginForAll('https://*.ytimg.com/');
  BrowserPolicy.content.allowOriginForAll('*.bootstrapcdn.com');
  BrowserPolicy.content.allowInlineScripts();
  BrowserPolicy.content.allowEval();
  BrowserPolicy.content.allowInlineStyles()
});
