Package.describe({
  name: "league-of-legends",
  summary: "Rise specific assets and changes for League Of Legends",
  version: "0.0.1",
});

/* This defines your actual package */
Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');

  api.addFiles(['lib/game.js'], ['client', 'server']);
  api.addFiles(filesInFolder("LeagueOfLegends","collections"), ['client', 'server']);

  api.addFiles(filesInFolder("LeagueOfLegends","assets"), 'client');

  api.export('Rise');
});

var filesInFolder = function(packageName,folder){
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
