$ = require 'jquery'
require 'materialize'

$ () ->
  $('.button-collapse').sideNav(closeOnClick: true)
  $('.parallax').parallax()
  $('.slider').slider()
  $('.scrollspy').scrollSpy()
  $('.modal-trigger').leanModal()
  window.Materialize.showStaggeredList('.stagger')

  options = [
    { selector: '#projects', offset: 50, callback: 'Materialize.toast("This is our ScrollFire Demo!", 1500 )' }
    { selector: '#contact', offset: 205, callback: 'Materialize.toast("Please continue scrolling!", 1500 )' }
    { selector: '#image-test', offset: 500, callback: 'Materialize.fadeInImage("#image-test")' }
  ];
  Materialize.scrollFire(options)
