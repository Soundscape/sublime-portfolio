$ = require 'jquery'
log = require './modules/log'
Blog = require './modules/blog'
Projects = require './modules/projects'
require 'materialize'

$ () ->
  window.db = require './modules/firebase.context'
  log.log 'Logger initialized'

  $('.button-collapse').sideNav(closeOnClick: true)
  log.log 'Side navigation initialized'

  $('.parallax').parallax()
  log.log 'Parallax initialized'

  $('.modal-trigger').leanModal()
  log.log 'Modals initialized'

  new Blog document.querySelector('#blogs')
  new Projects document.querySelector('#projects')

  $('.scrollspy').scrollSpy()
  log.log 'ScrollSpy initialized'

  options = [
    { selector: '#projects', offset: 50, callback: 'Materialize.toast("This is our ScrollFire Demo!", 1500 )' }
    { selector: '#contact', offset: 205, callback: 'Materialize.toast("Please continue scrolling!", 1500 )' }
    { selector: '#image-test', offset: 500, callback: 'Materialize.fadeInImage("#image-test")' }
  ];
  Materialize.scrollFire(options)
  log.log 'ScrollFire initialized'
