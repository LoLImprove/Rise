/*
 * Defines a toBool method that can be used on any object.
 * If the object is a String or a Number, it will do the conversion.
 */
Object.defineProperty(Object.prototype, 'toBool',{
  value: function() {
    if (_.isString(this)) {
      return (/^true$/i).test(this);
    } else if(_.isNumber(this)) {
      return !(this === 0);
    } else {
      return this;
    }
  },
  writable: true,
  configurable: true,
  enumerable: false
});
