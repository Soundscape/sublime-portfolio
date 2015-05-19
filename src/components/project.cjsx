React = require 'react'

module.exports = Project = React.createClass
  render: () ->
    if !@props.item
      <div></div>
    else
      url = "https://ghbtns.com/github-btn.html?user=#{@props.item.user}&repo=#{@props.item.repo}&type=star&count=false&size=large"

      <div className="col l4 m4 s12 center project">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={@props.item.img} />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              {@props.item.title}
              <i className="mdi-navigation-more-vert right"></i>
            </span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              {@props.item.title}
              <i className="mdi-navigation-close right"></i>
            </span>
            <p>{@props.item.summary}</p>
            <iframe src={url} className="project-button" frameBorder="0" scrolling="0">
            </iframe>
          </div>
        </div>
      </div>
