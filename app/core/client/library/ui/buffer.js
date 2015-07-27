Rise.UI = Rise.UI || {};

var RiseUIBuffer = (function() { this.data = {}; });

RiseUIBuffer.prototype.set = (function(key, value) {
  return this.data[key] = value;
});
RiseUIBuffer.prototype.get = (function(key) {
  return this.data[key];
});

Rise.UI.Buffer = new RiseUIBuffer();
