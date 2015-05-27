React = require 'react'
markdown = require('markdown').markdown

module.exports = Markdown = React.createClass
  render: () ->
    <div className={@props.className + ' markdown'} dangerouslySetInnerHTML={{__html: markdown.toHTML @props.markdown}}>
    </div>
