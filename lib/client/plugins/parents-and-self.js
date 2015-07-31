/*
 * $(el).parentsOrSelf(selector) -> [$(elements)] or $(element)
 */

(function($) {
	$.fn.parentsOrSelf = function(selector) {
    var el = $(this);
    return el.parents(selector).addBack(selector);
  }
})(jQuery);
