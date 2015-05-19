React = require 'react'

module.exports = Parallax = React.createClass
  render: () ->
    <div className="container">
      <div id={@props.id} className="section scrollspy">
        {@props.children}
      </div>
    </div>
