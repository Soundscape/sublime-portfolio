require './tracking'

$ = require 'jquery'
require 'materialize'

if location.pathname != '/blog'
  require '../components/app'
else
  require '../components/blog'

$ () ->
  $('.button-collapse').sideNav closeOnClick: true
  $('.parallax').parallax()
  $('.modal-trigger').leanModal()
  $('.scrollspy').scrollSpy()
  options = [
    #{ selector: '#projects', offset: 50, callback: 'Materialize.toast("This is our ScrollFire Demo!", 1500 )' }
  ];
  
  Materialize.scrollFire options
