$ = require 'jquery'
React = require 'react'

module.exports = LinkList = React.createClass
  render: () ->
    items = @props.items.map (item) => <li className={@props.itemClassName}><a href={item.href} className={@props.anchorClassName}>{item.text}</a></li>
    <ul className={@props.className}>
      {items}
    </ul>
