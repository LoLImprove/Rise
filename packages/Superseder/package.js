Package.describe({
  name: "rise-superseder",
  summary: "Rise Template Override mechanism",
  version: "0.0.1",
});

/* This defines your actual package */
Package.onUse(function (api) {
  api.use(['templating']);
  api.imply(['aldeed:template-extension@3.4.0']);
  api.versionsFrom('METEOR@1.0');

  api.addFiles(['lib/supersede.js'], ['client']);

  api.export('Superseder');
});
