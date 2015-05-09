$ = require 'jquery'
log = require './modules/log'
Blog = require './modules/blog'
Projects = require './modules/projects'
require 'materialize'

$ () ->
  log.log 'Logger initialized'

  $('.button-collapse').sideNav(closeOnClick: true)
  log.log 'Side navigation initialized'

  $('.parallax').parallax()
  log.log 'Parallax initialized'

  $('.modal-trigger').leanModal()
  log.log 'Modals initialized'

  #new Blog document.querySelector('#blogs')
  new Projects document.querySelector('#projects .row')

  $('.scrollspy').scrollSpy()
  log.log 'ScrollSpy initialized'

  options = [
    #{ selector: '#projects', offset: 50, callback: 'Materialize.toast("This is our ScrollFire Demo!", 1500 )' }
  ];
  Materialize.scrollFire(options)
  log.log 'ScrollFire initialized'
