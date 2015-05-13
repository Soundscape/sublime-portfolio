$ = require 'jquery'
log = require './modules/log'
Blog = require './modules/blog'
Projects = require './modules/projects'
Mail = require 'sublime-mail'
require 'materialize'

$ () ->
  open = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = (method, url, async, user, pass) ->
    @addEventListener 'readystatechange', () ->
      if @withCredentials
        @withCredentials = false
    , false

    open.call @, method, url, async, user, pass

  log.log 'Logger initialized'

  $('.button-collapse').sideNav(closeOnClick: true)
  log.log 'Side navigation initialized'

  $('.parallax').parallax()
  log.log 'Parallax initialized'

  $('.modal-trigger').leanModal()
  log.log 'Modals initialized'

  new Blog document.querySelector('#blogs')
  new Projects document.querySelector('#projects .row')

  $('.scrollspy').scrollSpy()
  log.log 'ScrollSpy initialized'

  options = [
    #{ selector: '#projects', offset: 50, callback: 'Materialize.toast("This is our ScrollFire Demo!", 1500 )' }
  ];
  Materialize.scrollFire(options)
  log.log 'ScrollFire initialized'

  mailer = new Mail.Mailer '--api--'
  $('form').on 'submit', (e) ->
    console.log arguments, @

    mailer.send(
      'shaunfarrell@g.harvard.edu'
      $('#email').val()
      'Message from ' + $('#first_name').val() + ' ' + $('#last_name').val()
      $('textarea').val()
    )

    e.preventDefault()
    false
