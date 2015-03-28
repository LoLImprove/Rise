Template.Loading.rendered = function () {
  var message = '<p class="loading-message">Loading Message</p>';
  var spinner = UI.render(Template.LoadingSpinner)._render().value;

  if (!Session.get('loadingSplash')) {
    this.loading = pleaseWait({
      logo: Rise.Game.assetsPathFor('logo.png'),
      backgroundColor: '#9AC442',
      loadingHtml: message + spinner
    });
    Session.set('loadingSplash', true); // just show loading splash once
  }
};

Template.Loading.destroyed = function () {
  if (this.loading) {
    this.loading.finish();
  }
};
