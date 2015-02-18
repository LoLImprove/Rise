Rise.UI = Rise.UI || {};

Rise.UI.Form = {
  ShowErrors: function(template, errors){
    var form = template.$('form'),
        falsyFields = parseValidation(errors);

    Rise.UI.Form.HideErrors(template);

    if (!_.isEmpty(falsyFields)) {
      _.each(falsyFields, function(falsyField) {
        var input = form.find('input[name="' + falsyField.name + '"]');
        var inputContainer = input.parent();

        // If the container has the class 'has-error' we don't override the error
        var message = _.str.capitalize(falsyField.label) + ' is ' + falsyField.reason + '.';

        // We add a class to custom to differenciate from meteor auto-form errors
        inputContainer.addClass('custom-error');
        input.siblings('.help-block').html(message);
      });
    }
  },
  HideErrors: function(template) {
    inputContainers = template.$('form .custom-error, .form .has-error');
    inputContainers.each(function(i, inputContainer) {
      $(inputContainer).removeClass('custom-error').removeClass('has-error');
      $(inputContainer).find('.help-block').html(' ');
    });
  }
};

// Uses SimpleSchema to parse the errors received from meteor auto-form
function parseValidation(validation) {
  var falsyFields = [];

  _.each(validation.invalidKeys, function(invalidKey) {
    var field  = invalidKey.name,
        reason = invalidKey.type,
        schema = validation.validationContext._schema,
        schemaKeys = validation.validationContext._schemaKeys,
        fieldType  = schema[field].type.name;

    // If we have an object it may need to contain other properties
    // Having an error on an object means all properties are missing
    if (fieldType === "Object") {
      fields = _.filter(schemaKeys, function(schemaField) {
        return schemaField.match(field + "[.].+");
      })
      fields = _.map(fields, function(fieldName) {
        // key: "parentField.property1", name: "property1", reason: "required"
        return { name: fieldName,
                 label: _getLastKey(fieldName),
                 reason: 'required'
               };
      });

      falsyFields = falsyFields.concat(fields);
    } else {
      falsyFields.push({ name: field, label: _getLastKey(field), reason: reason });
    }
  });

  return falsyFields;
};

function _getLastKey(composedKey) {
  var matcher = /.*[.]/;
  return composedKey.replace(matcher, '');
};


/*function(form, fields) {
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
*/
