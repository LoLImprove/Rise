Rise.Log = (function() {
  var options = Rise.LoggerOptions;
  if (options.method === 'console') {
    var fullMethod = console[options.level];
    fullMethod.call(console, 'Logged : ', arguments)
  } else {
    // Log to file or something
  }
})

Rise.LoggerOptions = {
  level: 'debug',
  method: 'console'
};
