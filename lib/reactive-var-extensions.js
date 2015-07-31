ReactiveVar.prototype.is = (function(value) {
  return this.get() === value;
});
