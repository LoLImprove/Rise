Meteor.startup(function () {
  var SMTP = {
    username: Rise.ENV.get('SMTP_USERNAME'),
    password: Rise.ENV.get('SMTP_PASSWORD'),
    server:   Rise.ENV.get('SMTP_SERVER'),
    port: Rise.ENV.get('SMTP_PORT') || 25
  }
  Rise.ENV.set('MAIL_URL', 'smtp://' + encodeURIComponent(SMTP.username) + ':' + encodeURIComponent(SMTP.password) + '@' + encodeURIComponent(SMTP.server) + ':' + SMTP.port);
  console.log(process.env.MAIL_URL);
});
