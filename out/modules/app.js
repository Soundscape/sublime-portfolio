(function() {
  var $;

  $ = require('jquery');

  require('materialize');

  require('../components/app');

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
