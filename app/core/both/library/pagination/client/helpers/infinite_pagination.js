Template.InfinitePagination.hooks({
  rendered: function() {
    var template = Template.InfinitePagination;
    var offset = template.offset || 0;

    $(window).scroll(function() {
      if ($(window).scrollTop() + $(window).height() >= $(document).height() - offset) {
        return Template.InfinitePagination.loadNextPage();
      }
    });
  }
});
