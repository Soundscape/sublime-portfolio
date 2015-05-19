LinkList = require './link.list'
React = require 'react'

items = [
  { href: '#intro', text: 'About me' },
  { href: '#projects', text: 'Projects' },
  { href: '#contact', text: 'Contact' }
]

module.exports = NavBar = React.createClass
  render: () ->
    <nav role="navigation" className={@props.className}>
      <div className="nav-wrapper container">
        <a id="logo-container" href="#!" className="brand-logo">{@props.title}</a>
        <LinkList items={items} className="right hide-on-med-and-down" />
        <div id="nav-mobile" className="side-nav">
          <LinkList items={items} className="table-of-contents" />
        </div>
        <a href="#!" data-activates="nav-mobile" className="button-collapse">
          <i className="mdi-navigation-menu"></i>
        </a>
      </div>
    </nav>
