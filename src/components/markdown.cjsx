React = require 'react'
markdown = require('markdown').markdown

module.exports = Markdown = React.createClass
  getInitialState: () -> markdown: @props.markdown or ''
  
  setContent: (markdown) -> @setState markdown: markdown or ''
  
  render: () ->
    <div className={@props.className + ' markdown'} dangerouslySetInnerHTML={{__html: markdown.toHTML @state.markdown}}>
    </div>
