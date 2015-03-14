
Package.describe({
  name: "rise-leagueoflegends",
  summary: "Rise specific assets and changes for League Of Legends",
  version: "0.0.1",
});

Npm.depends

/* This defines your actual package */
Package.onUse(function (api) {
  Npm.require('./characters-list')
  //console.log(Rise.PlatformSpecifics.CharactersList);
  api.versionsFrom('METEOR@1.0');
  api.addFiles(['assets/images/',
                'assets/images/'
               ], 'client');
});
