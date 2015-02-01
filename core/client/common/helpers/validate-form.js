Rise.Helpers = Rise.Helpers || {};

Rise.Helpers.validateForm = function(form, fields) {
  var validations = [];

  _.each(fields, function(opts, fieldName) {
    var field = form.find("input[name='" + fieldName + "']"),
        helpBlock = field.siblings('.help-block'),
        formGroup = field.parent('.form-group');

    valid = opts.validation.call(this, field[0]);
    validations.push(valid);

    if (valid) {
      formGroup.removeClass('has-error');
      helpBlock.html('');
    } else {
      formGroup.addClass('has-error');
      helpBlock.html(opts.message);
    }
  });

  console.log(validations);
  return !_.contains(validations, false);
};

// hello[].emails.0.address => hello\\[\\]\\.emails\\.0\\.address
Rise.Helpers.sanitizeFieldName = function(field) {
  return field.replace(/([\[\].])/g, function(match){
    return '\\\\' + match;
  });
}
