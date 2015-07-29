/*
 * $('textarea').lines() -> returns the number of lines
 */

(function($) {
	$.fn.lines = function(options) {
    var el = $(this);
    var padding = parseInt(el.css('paddingTop'), 10) + parseInt(el.css('paddingBottom'), 10);
    var lht = parseInt(el.css('lineHeight'), 10);
    return parseInt((el.prop('scrollHeight') - padding) / lht, 10);
  }
})(jQuery);
