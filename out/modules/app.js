(function() {
  var $;

  require('./tracking');

  $ = require('jquery');

  require('materialize');

  if (location.pathname !== '/blog') {
    require('../components/app');
  } else {
    require('../components/blog');
  }

  $(function() {
    var options;
    $('.button-collapse').sideNav({
      closeOnClick: true
    });
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();
    $('.scrollspy').scrollSpy();
    options = [];
    return Materialize.scrollFire(options);
  });

}).call(this);
