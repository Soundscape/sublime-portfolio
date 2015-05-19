$ = require 'jquery'
require 'materialize'
require '../components/app'

$ () ->
  open = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = (method, url, async, user, pass) ->
    @addEventListener 'readystatechange', () ->
      if @withCredentials
        @withCredentials = false
    , false

    open.call @, method, url, async, user, pass

  $('.button-collapse').sideNav closeOnClick: true
  $('.parallax').parallax()
  $('.modal-trigger').leanModal()
  $('.scrollspy').scrollSpy()
  options = [
    #{ selector: '#projects', offset: 50, callback: 'Materialize.toast("This is our ScrollFire Demo!", 1500 )' }
  ];
  Materialize.scrollFire options
