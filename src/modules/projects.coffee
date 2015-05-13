db = require './firebase.context'
$ = require 'jquery'

class Projects
  constructor: (el) ->
    window.db = db
    @el = $ el
    @el.addClass 'row'
    @fetch()

  render: (items) ->
    @el.empty()

    items.forEach (item) =>
      project = $('<div />', { 'class': 'col l6 m6 s12 center projects' })
      card = $('<div />', { 'class': 'card' }).appendTo project

      img = $('<div />', { 'class': 'card-image waves-effect waves-block waves-light' }).appendTo card
      $('<img />', { 'class': 'activator', src: item.img }).appendTo img

      content = $('<div />', { 'class': 'card-content' }).appendTo card
      title = $('<span />', { 'class': 'card-title activator grey-text text-darken-4' }).appendTo content
      $('<span />', { text: item.title }).appendTo title
      $('<i />', { 'class': 'mdi-navigation-more-vert right' }).appendTo title

      p = $('<p />').appendTo content

      reveal = $('<div />', { 'class': 'card-reveal' }).appendTo card
      title = $('<span />', { 'class': 'card-title grey-text text-darken-4' }).appendTo reveal
      wave = $('<span />', { text: item.title }).appendTo title
      wave = $('<i />', { 'class': 'mdi-navigation-close right' }).appendTo title
      $('<p />', { text: item.summary }).appendTo reveal
      $('<iframe />', { src: 'https://ghbtns.com/github-btn.html?user=' + item.user + '&repo=' + item.repo + '&type=star&count=false&size=large', frameborder: '0', scrolling: '0', width: '160px', height: '30px' }).appendTo reveal

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
