React = require 'react'

module.exports = BlogListItem = React.createClass
  render: () ->
    <li className="collection-item blog-list-item">
      <div>
        <a href={'#' + @props.item._id}>
          {@props.item.title}
        </a>
        <br />
        <span>{@props.item.summary}</span>
      </div>
    </li>