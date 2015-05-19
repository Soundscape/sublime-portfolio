$ = require 'jquery'
React = require 'react'
Project = require './project'
db = require '../modules/firebase'

module.exports = Projects = React.createClass
  getInitialState: () -> data: []

  loadData: () ->
    db.query('project').on 'value', (s) =>
      items = []

      data = s.val()
      Object.getOwnPropertyNames data || {}
        .forEach (key) ->
          item = data[key]
          item._id = key
          items.push item

      @setState data: items.sort (a, b) -> a.title > b.title

  componentWillMount: () ->
    @loadData()

  render: () ->
    rows = @state.data.length / 3 + (if @state.data.length % 3 != 0 then 1 else 0) - 1

    <div className="projects">
      {<div className="row" key={y}>
        {for x in [0..2]
          <Project key={y * 3 + x} item={@state.data[y * 3 + x]} />}
      </div> for y in [0..rows]}
    </div>
