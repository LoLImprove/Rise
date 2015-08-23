Template.afFormGroup_nestedGroup.helpers({
  data: function() {
    // Retrieves the data from the template that called this one, because we are in nested templates due to autoform way of handling custom templates.
    return Template.instance().parent(4).data;
  },
  contentBlock: function() {
    // Retrieves the given content block because we are in nested templates due to autoform way of handling custom templates.
    return Template.instance().parent(3).view.templateContentBlock;
  },
});
