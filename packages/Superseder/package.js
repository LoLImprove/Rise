Package.describe({
  name: "rise-superseder",
  summary: "Rise Template Override mechanism",
  version: "0.0.2",
});

/* This defines your actual package */
Package.onUse(function (api) {
  api.use(['templating', 'aldeed:template-extension@3.4.0']);
  api.versionsFrom('METEOR@1.2');

  api.addFiles(['lib/superseder.js'], ['client', 'server']);

  api.export('Superseder');
});
