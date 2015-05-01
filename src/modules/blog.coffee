db = require './firebase.context'
$ = require 'jquery'

class Blog
  constructor: (el) ->
    @el = $ el
    @fetch()

  render: (items) ->
    @el.empty()

    items.forEach (item) =>
      li = $('<li />')
      $('<a />', { href: '#!', text: item.title }).appendTo li
      icon = $('<a />', { href: '#!', 'class': 'secondary-content' }).appendTo li
      $('<i />', { 'class': 'mdi-content-send' }).appendTo icon
      $('<div />', { text: item.summary }).appendTo li
      li.appendTo @el

    window.Materialize.showStaggeredList @el

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
