Template.Loading.rendered = function () {
  var dotCount = 0;
  var messageContent = 'Loading';
  var message = '<div class="loading-message-container"><p class="loading-message">' + messageContent + '</p></div>';
  var spinner = UI.render(Template.LoadingSpinner)._render().value;


  if (!Session.get('loadingSplash')) {
    this.loading = pleaseWait({
      logo: '',//Rise.Game.assetsPathFor('logo.png'),
      backgroundColor: '#4eb6ee',
      loadingHtml: message + spinner
    });
    this.updateLoadingMessage = setInterval(function(){ console.log('hello', $('.loading-message')); dotCount = dotCount >= 4 ? 1 : dotCount + 1; $(".loading-message").text(messageContent + Array(dotCount).join(".")); }, 600);
    Session.set('loadingSplash', true); // just show loading splash once
  }
};

Template.Loading.destroyed = function () {
  if (this.loading) {
    clearInterval(this.updateLoadingMessage);
    this.loading.finish();
  }
};
