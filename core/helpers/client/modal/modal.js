Rise.Modal = Rise.Modal || {}

/*
 * Rise.Modal, two helpers helping with modal creation
 *
 * - Rise.Modal allows to programaticaly create a modal, passing it a template.
 * - {{ #modal }}{{ /modal}} is a template helper to create a modal in any template, See the modal.md file.
 *
 */

/*
 * Rise.Modal
 *
 *   Rise.Modal.create(template, anyBootboxjsOption)
 *     Creates a modal containing the given template
 *
 *   Rise.Modal.dismiss()
 *     Dismiss all created modals, even ones created through {{modal}}{{/modal}}
 *
 */
Rise.Modal = {
  __currentModalsIds: [],

  create: function(template, opts) {
    opts.message = "<div class='bootbox-content'></div>";
    bootbox.dialog(opts);
    Blaze.render(template, $('.bootbox-content')[0], null, UI.body);
  },

  currentModal: function() {
    if (_.isEmpty(this.__currentModalsIds)) {
      return $('.bootbox-content').parents('.modal-dialog');
    } else {
      return $('#' + this.__currentModalsIds.slice(-1)[0]);
    }
  },

  dismiss: function(id) {
    if (id) {
      $('#' + id).modal('hide');
      this.__currentModalsIds = _.without(this.__currentModalsIds, id);
    } else {
      if (Rise.UI.doesElementExists('.bootbox-content')) {
        bootbox.hideAll();
      } else {
        _.each(this.__currentModalsIds, function(modalId) {
          $('#' + modalId).modal('hide');
        });

        this.__currentModalsIds = [];
      }
    }

    $('body').removeClass('modal-open');
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
  _defaultOnCancel: function(event, id) { return true; },
};

/* See the modal.md file */
Template.registerHelper('modal', function() {
  return Template._RiseModal;
});

Template._RiseModal.hooks({
  created: function() {
    this.context = this.parent(); // Sets the context on the template instance
    this.data.context = this.context.data; // Sets the context's data in the modal data
    this.data.id = this.data.id || "rise-modal";
  },
  rendered: function() {
    $('#' + this.data.id).modal({
      backdrop: 'static',
      keyboard: false
    });

    Rise.Modal.__currentModalsIds.push(this.data.id);
  },
  destroyed: function() {
    Rise.Modal.dismiss(this.data.id);
  }
});

Template._RiseModal.events({
  'click .validate-btn': function(event) {
    event.preventDefault();
    var onValidateFunc = this.onValidate || Rise.Modal._defaultOnValidate;
    var doClose = onValidateFunc(event, this.id);
    if (doClose) {
      Rise.Modal.dismiss(this.id);
    }
  },
  'click .cancel-btn, click .close-modal': function(event) {
    event.preventDefault();
    var onCancelFunc = this.onCancel || Rise.Modal._defaultOnCancel;
    var doClose = true;

    if (_.isString(this.onCancel)) {
      doClose = Rise.Runtime.chain(window, this.onCancel).call();
    } else {
      doClose = onCancelFunc(event, this.id);
    }
    if (doClose) {
      Rise.Modal.dismiss(this.id);
    }
  }
});

Template._RiseModal.helpers({
  title: function() {
    return this.title;
  },

  modalId: function() {
    return this.id;
  },
  canClose: function() {
    var closable = true;
    if (!_.isUndefined(this.canClose)) {
      closable = this.canClose;
    }
    return closable;
  },
  /* Validate and Cancel button's text */
  validateButton: function() {
    return this.validateButton || "Save";
  },
  cancelButton: function() {
    return this.cancelButton || "Cancel";
  }
});
