import _flashMessages from './flash-messages.js';
const ENV = Meteor.settings.public.env;

if (Meteor.isClient) {

  if (ENV.development) {
    window.FlashMessages = _flashMessages;
  }

}

export const FlashMessages = _flashMessages;
