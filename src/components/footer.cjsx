LinkList = require './link.list'
React = require 'react'

module.exports = Footer = React.createClass
  render: () ->
    <footer className={'page-footer ' + @props.className}>
      <div className="container">
        <div className="row">
          <div className="col s12 m6 l6">
            <h5 className="white-text">Quick links</h5>
            <LinkList items={@props.items} anchorClassName="white-text" />

            <iframe src="https://ghbtns.com/github-btn.html?user=soundscape&type=follow&size=large" frameBorder="0" scrolling="0" width="220px" height="30px">
            </iframe>
          </div>
          <div className="col s12 m6 l6 white-text">
            <h5 className="white-text">Contact info</h5>
            <h6 className="mdi-action-home">Address</h6>
            <p>Nr. 13, 323 York Avenue, Johannesburg, SA</p>
            <h6 className="mdi-hardware-phone-android">Phone Number</h6>
            <p>+27 78 246 9605</p>
            <h6 className="mdi-action-open-in-browser">Website</h6>
            <p>sublime-dev.firebaseapp.com</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          Made by <a href="#intro" className="teal-text text-lighten-3">Shaun Farrell</a> with <a href="http://materializecss.com/" target="_blank" className="teal-text text-lighten-3">Materialize</a>
        </div>
      </div>
    </footer>
