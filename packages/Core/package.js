Package.describe({
  name: "rise:core",
  summary: "Rise core libraries, utilities and styles",
  version: "0.0.1",
});

Package.onUse(function (api) {
  // When in dire need of including an internal library
  // https://github.com/meteor/meteor/tree/release-1.3/packages/modules#modular-package-structure

  api.use(['ecmascript', 'fourseven:scss@3.4.1', 'wolves:bourbon@3.1.0', 'wolves:neat@3.1.0', 'tmeasday:check-npm-versions']);
  api.versionsFrom('METEOR@1.3-modules-beta.6');

  // Import styles
  api.addFiles(filesInFolder("Core", "style"), 'client', { isImport: true })

  // Import the core library
  api.mainModule("index.js", "client");
//  api.export('Core');
});

var filesInFolder = function(packageName, folder){
  // local imports
  var _    = Npm.require("underscore");
  var fs   = Npm.require("fs");
  var path = Npm.require("path");

  function walk(folder){
    var filenames = [];
    // get relative filenames from folder
    var folderContent = fs.readdirSync(folder);
    // iterate over the folder content to handle nested folders
    _.each(folderContent,function(filename){
      // build absolute filename
      var absoluteFilename = folder+path.sep+filename;
      // get file stats
      var stat = fs.statSync(absoluteFilename);
      if(stat.isDirectory()){
        // directory case => add filenames fetched from recursive call
        filenames = filenames.concat(walk(absoluteFilename));
      }
      else{
        // file case => simply add it
        filenames.push(absoluteFilename);
      }
    });
    return filenames;
  }
  // save current working directory (something like "/home/user/projects/my-project")
  var cwd = process.cwd();
  // chdir to our package directory
  process.chdir("packages" + path.sep+packageName);
  // launch initial walk
  var result = walk(folder);
  // restore previous cwd
  process.chdir(cwd);

  return result;
}
