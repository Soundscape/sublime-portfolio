db = require './firebase.context'
$ = require 'jquery'

class Projects
  constructor: (el) ->
    @el = $ el
    @el.addClass 'row'
    @fetch()

  render: (items) ->
    @el.empty()

    items.forEach (item) =>
      project = $('<div />', { 'class': 'col l4 m6 s12 center projects' })
      card = $('<div />', { 'class': 'card' }).appendTo project

      img = $('<div />', { 'class': 'card-image waves-effect waves-block waves-light' }).appendTo card
      $('<img />', { 'class': 'activator', src: item.img }).appendTo img

      content = $('<div />', { 'class': 'card-content' }).appendTo card
      title = $('<span />', { 'class': 'card-title activator grey-text text-darken-4' }).appendTo content
      $('<span />', { text: item.title }).appendTo title
      $('<i />', { 'class': 'mdi-navigation-more-vert right' }).appendTo title

      p = $('<p />').appendTo content
      a = $('<a />', { href: item.href, text: 'Check it out' }).appendTo p

      reveal = $('<div />', { 'class': 'card-reveal' }).appendTo card
      title = $('<span />', { 'class': 'card-title grey-text text-darken-4' }).appendTo reveal
      wave = $('<span />', { text: item.title }).appendTo title
      wave = $('<i />', { 'class': 'mdi-navigation-close right' }).appendTo title
      $('<p />', { text: item.summary }).appendTo reveal

      project.appendTo @el

  fetch: () ->
    db.query('project').on 'value', (s) =>
      items = []

      data = s.val()
      Object.getOwnPropertyNames data || {}
        .forEach (key) ->
          item = data[key]
          item._id = key
          items.push item

      @render items


module.exports = Projects
