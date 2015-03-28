Notify = (function(type, opts) {
  var notification = Rise.Config.load('notifications').notifications[type];

  // Won't notify self
  if (opts.from !== opts.to && !_.isUndefined(notification)) {
    Notifications.new({
      title: notification.title,
      link: opts.link,
      from: opts.from,
      owner: opts.to,
      icon: opts.icon || 'comment',
      class: opts.icon || 'default',
    })
  } else {
    console.log('Did not notify self for ', type);
  }
});
