export default (function() {
  Meteor.startup(function () {
    /* Needed for youtube iframes */
    BrowserPolicy.content.allowOriginForAll('https://*.githubusercontent.com');
    BrowserPolicy.content.allowOriginForAll('http://*.googleapis.com');
    BrowserPolicy.content.allowOriginForAll('http://*.gstatic.com');
    BrowserPolicy.content.allowOriginForAll('https://www.youtube.com/');
    BrowserPolicy.content.allowOriginForAll('https://*.ytimg.com/');
    BrowserPolicy.content.allowOriginForAll('*.bootstrapcdn.com');
    BrowserPolicy.content.allowDataUrlForAll();
    BrowserPolicy.content.allowEval();
    BrowserPolicy.content.allowInlineStyles()
  });
});
