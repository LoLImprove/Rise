Rise.Helpers = Rise.Helpers || {};

Rise.Helpers.Modal = function(template, opts) {
  opts.message = "<div class='bootbox-content'></div>";
  bootbox.dialog(opts);
  UI.render(template, $('.bootbox-content')[0]);
};
