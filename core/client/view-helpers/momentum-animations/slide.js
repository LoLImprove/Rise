Momentum.registerPlugin('slide', function(options) {
  return {
    insertElement: function(node, next) {
      console.log('insert', node, next);
      $(node).insertBefore(next).addClass('slideDown closed');
    },
    removeElement: function(node) {
      console.log('remove', node);
      $(node).remove();
    }
  }
});
