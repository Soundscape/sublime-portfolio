React = require 'react'

module.exports = ParallaxSection = React.createClass
  render: () ->
    <div id={@props.id} className="parallax-container valign-wrapper">
      <div className="section no-pad-bot">
        <div className="container">
          {@props.children}
        </div>
      </div>
      <div className="parallax">
        <img alt="" src={@props.src} />
      </div>
    </div>
