db = require './firebase.context'
$ = require 'jquery'

class Blog
  constructor: (el) ->
    @el = $ el
    @fetch()

  render: (items) ->
    $('.preloader-wrapper', @el).fadeOut('fast')
    $('ul', @el).empty()

    items.forEach (item) =>
      li = $('<li />')
      $('<a />', { href: '#view', text: item.title, 'data-target': 'view', 'class': 'modal-trigger' }).appendTo li
      icon = $('<a />', { href: '#view', 'data-target': 'view', 'class': 'secondary-content modal-trigger' }).appendTo li
      $('<i />', { 'class': 'mdi-content-send' }).appendTo icon
      $('<div />', { text: item.summary }).appendTo li
      li.appendTo $('ul', @el)

    window.Materialize.showStaggeredList @el
    $('.modal-trigger', @el).leanModal()

  fetch: () ->
    db.query('blog').on 'value', (s) =>
      items = []

      data = s.val()
      Object.getOwnPropertyNames data || {}
        .forEach (key) ->
          item = data[key]
          item._id = key
          items.push item

      @render items


module.exports = Blog
