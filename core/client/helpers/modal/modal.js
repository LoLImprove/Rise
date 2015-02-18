/*
 * Rise.Modal, two helpers helping with modal creation
 *
 * - Rise.Helpers.Modal allows to programaticaly create a modal, passing it a template.
 * - {{ #modal }}{{ /modal}} is a template helper to create a modal in any template, See the modal.md file.
 *
 */
Rise.Helpers = Rise.Helpers || {};

/*
 * Rise.Helpers.Modal
 *
 *   Rise.Helpers.Modal.create(template, anyBootboxjsOption)
 *     Creates a modal containing the given template
 *
 *   Rise.Helpers.Modal.dismiss()
 *     Dismiss all created modals
 *
 */
Rise.Helpers.Modal = {
  create: function(template, opts) {
    opts.message = "<div class='bootbox-content'></div>";
    bootbox.dialog(opts);
    Blaze.render(template, $('.bootbox-content')[0], null, UI.body);
  },
  dismiss: function() {
    bootbox.hideAll();
  },
  _defaultOnValidate: function(event, id) {
    var form = $('#' + id).find('form');
    if (Rise.UI.doesElementExists(form)) {
      form.submit();
      return true;
    } else {
      return true;
    }
  },
  _defaultOnCancel: function(event, id) {
    return true;
  }
};

/* See the modal.md file */
Template.registerHelper('modal', function() {
  return Template._RiseModal;
});

Template._RiseModal.hooks({
  rendered: function() {
    var id = this.data.id || "rise-modal";
    $('#' + id).modal({
      backdrop: 'static',
      keyboard: false
    });
  },
  created: function() {
    this.context = this.parent(); // Sets the context on the template instance
    this.data.context = this.context.data; // Sets the context's data in the modal data
  }
});

Template._RiseModal.events({
  'click .validate-btn': function(event) {
    event.preventDefault();
    var id = this.id || "rise-modal";
    var onValidateFunc = this.onValidate || Rise.Helpers.Modal._defaultOnValidate;
    var doClose = onValidateFunc(event, id);
    if (doClose) {
      $('#' + id).modal('hide');
    }
  },
  'click .cancel-btn': function(event) {
    event.preventDefault();
    var id = this.id || "rise-modal";
    var onCancelFunc = this.onCancel || Rise.Helpers.Modal._defaultOnCancel;
    var doClose = onCancelFunc(event, id);
    if (doClose) {
      $('#' + id).modal('hide');
    }
  }
});

Template._RiseModal.helpers({
  title: function() {
    return this.title;
  },

  modalId: function() {
    return this.id || "rise-modal"
  },
  canClose: function() {
    var closable = true;
    if (!_.isUndefined(this.canClose)) {
      closable = this.canClose;
    }
    return closable;
  },
  validateButton: function() {
    var validateButton = "Save";
    if (!_.isUndefined(this.validateButton)) {
      validateButton = this.validateButton;
    }
    return validateButton;
  },
  cancelButton: function() {
    var cancelButton = "Cancel";
    if (!_.isUndefined(this.cancelButton)) {
      cancelButton = this.cancelButton;
    }
    return cancelButton;
  }
});
