Template.body.events({
  "click": function(e, data, tpl) {
    // If we are in the notification panel
    //var clickedOutsideOfNotificationPanel = ($(e.target).closest('.notificationsDropdown').length === 0 && !$(e.target).hasClass('notificationsDropdown'));
    var clickedInsideNotificationToggle = $(e.target).closest('.notificationsDropdown').length > 0;

    if (!clickedInsideNotificationToggle && Session.get('notifications:show')) {
      Session.set('notifications:show', false);
    }
    return true;
  }
});
