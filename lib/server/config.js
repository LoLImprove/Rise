Rise.Config = Rise.Config || {};

Rise.Config.loaded = {}

// Files to be loaded should be put in the root `private/` directory
Rise.Config.load = (function(file) {
  Rise.Config.loaded[file] = Rise.Config.loaded[file] || YAML.safeLoad(Assets.getText(file + '.yml'));
  return Rise.Config.loaded[file];
});
