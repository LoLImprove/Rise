# Meteor {{#modal}} helper

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
   - If not specified, onCancel will simply close the modal.

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