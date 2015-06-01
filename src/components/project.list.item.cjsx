React = require 'react'

module.exports = ProjectListItem = React.createClass
  render: () ->
    url = "https://github.com/#{@props.item.user}/#{@props.item.repo}"
    
    <li className="collection-item avatar project-list-item">
      <i className={(@props.className || 'mdi-file-folder-open circle blue-grey')}></i>
      <span className="title">{@props.item.title}</span>
      <p>{@props.item.summary}</p>
      <a href={url} className="secondary-content waves-effect blue-text" target="_blank">
        Github <i className="mdi-action-launch" />
      </a>
    </li>