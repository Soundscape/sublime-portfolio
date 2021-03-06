$ = require 'jquery'
React = require 'react'
ProjectListItem = require './project.list.item'
db = require '../modules/firebase'
Enumerable = require 'linq'

module.exports = ProjectList = React.createClass
  getInitialState: () ->
    data: []
    items: []
    size: @props.size or 5
    index: 0
    pages: 1

  loadData: () ->
    db.query('project').on 'value', (s) =>
      items = []

      data = s.val()
      Object.getOwnPropertyNames data || {}
        .forEach (key) ->
          item = data[key]
          item._id = key
          items.push item

      items = items.sort (a, b) -> a.title > b.title
      pages = Math.floor(items.length / @state.size) + (if 0 == items.length % @state.size then 0 else 1)
      current = Enumerable.from(items).skip(@state.index * @state.size).take(@state.size).toArray()
      @setState
        data: items
        pages: pages
        items: current
        
      @getDOMNode().classList.remove 'hide'

  move: (e) ->
    pageIndex = parseInt(e.target.getAttribute 'data-page')
    @moveTo pageIndex
      
  moveTo: (pageIndex) ->
    pageIndex = if 0 > pageIndex then 0 else pageIndex
    pageIndex = if @state.pages <= pageIndex then @state.pages - 1 else pageIndex
    @setState
      index: pageIndex
      items: Enumerable.from(@state.data).skip(pageIndex * @state.size).take(@state.size).toArray()
      
    $('.pagination li.page.active', @getDOMNode()).attr 'class', 'waves-effect page'
    $('.pagination li.page[data-page=' + pageIndex + ']', @getDOMNode()).attr 'class', 'active teal page'
      
  prev: () ->
    pageIndex = @state.index - 1
    @moveTo pageIndex
      
  next: () ->
    pageIndex = @state.index + 1
    @moveTo pageIndex
  
  componentWillMount: () ->
    @loadData()

  render: () ->
    <div className="project-list row hide">
      <ul className="collection">
        {for i in @state.items
          <ProjectListItem item={i} />}
      </ul>
      <ul className="pagination">
        <li className={if @state.index == 0 then 'disabled' else 'waves-effect'} onClick={@prev}><a href="#!"><i className="mdi-navigation-chevron-left"></i></a></li>
        {for i in [1..@state.pages]
          <li className={if i - 1 == @state.index then 'active teal page' else 'waves-effect page'} onClick={@move} data-page={i - 1}><a href="#!" data-page={i - 1}>{i}</a></li>}
        <li className={if @state.index == @state.pages - 1 then 'disabled' else 'waves-effect'} onClick={@next}><a href="#!"><i className="mdi-navigation-chevron-right"></i></a></li>
      </ul>
      <span className="right">{@state.data.length} projects available</span>
    </div>