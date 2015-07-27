# Meteor {{#modal}} helper

## Dependencies

- [Meteor template-extension](https://github.com/aldeed/meteor-template-extension)
  `meteor add aldeed:template-extension`

## Example use

```html
  <template name="someTemplate">
    {{ #modal title="Post a new replay" id="new-replay-modal" canClose=false validateButton="Save" cancelButton="Cancel" onValidate=doSomething}}
      <p>Some sweet html</p>
      {{ > AnotherTemplate }}
    {{ /modal }}
  </template>
```

## Options

 - title, the title of the modal as a String.
 - id, a custom id for the modal as a String. (default: 'rise-modal')
 - canClose, a Boolean indicating wether or not to display the close cross.
 - validateButton, the text for the validateButton as a String. (default: 'Save')
 - cancelButton, the text for the cancelButton as a String. (default: 'Cancel')
 - onValidate, a callback Function, called when the validate button is clicked.
   - If not specified, onValidate will search for a form in the modal and submit it.
 -  onCancel, a callback Function, called when the cancel button is clicked.
   - If the callback is a Function, it will call a template's helper
   - If the callback is a string, it will call the method chain on the `window` object (i.e: `window.history.back` will be called if we have `onCancel="history.back"`)
   - If not specified, onCancel will simply close the modal.

## Context

When you user the `modal` template helper, the context within the block is actually the **modal's context**. Which means `this` will return the **modal object**.
To access the parent's context, use `this.context`.

## Callbacks definition

If you pass an `onValidate` or `onCancel` callback you can return a `function` from your template helpers (or from anywhere, just pass in the function).

- The provided arguments are the `click event` and the `modalId`;
- Returning `true` from the callback will close the modal, if `false` or nothing is returned, the modal will stay shown.

```javascript
  Template.someTemplate.helpers({
    doSomething: function() {
      return function(event, modalId) {
        // do something, submit a form, validate stuff
        return true;
      }
    }
  });
```
