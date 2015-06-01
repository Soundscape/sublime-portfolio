$ = require 'jquery'
React = require 'react'
db = require '../modules/firebase'
Enumerable = require 'linq'
BlogListItem = require './blog.list.item'

module.exports = BlogList = React.createClass
  getInitialState: () ->
    items: []
    size: parseInt @props.size or 5

  loadData: () ->
    db.query('blog', limit: @state.size).on 'value', (s) =>
      items = []

      data = s.val()
      Object.getOwnPropertyNames data || {}
        .forEach (key) ->
          item = data[key]
          item._id = key
          items.push item

      items = items.sort (a, b) -> a.title > b.title
      
      @setState items: items
      @getDOMNode().classList.remove 'hide'

  componentWillMount: () ->
    @loadData()

  render: () ->
    <div className={@props.className + ' blog-list hide'}>
      <ul className="collection with-header">
        <li className="collection-header"><h5>Latest entries</h5></li>
        {for i in @state.items
          <BlogListItem item={i} />}
      </ul>
    </div>