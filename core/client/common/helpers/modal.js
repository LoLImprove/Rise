Rise.Helpers = Rise.Helpers || {};

Rise.Helpers.Modal = {
  create: function(template, opts) {
    opts.message = "<div class='bootbox-content'></div>";
    bootbox.dialog(opts);
    UI.render(template, $('.bootbox-content')[0]);
  },
  dismiss: function() {
    bootbox.hideAll();
  }
};
