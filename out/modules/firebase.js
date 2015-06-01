(function() {
  var Net, firebase;

  Net = require('sublime-net');

  firebase = new Net.Firebase('https://sublime-dev.firebaseio.com/');

  module.exports = firebase;

}).call(this);
