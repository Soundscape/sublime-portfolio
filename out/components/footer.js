var Footer, LinkList, React;

LinkList = require('./link.list');

React = require('react');

module.exports = Footer = React.createClass({
  render: function() {
    return React.createElement("footer", {
      "className": 'page-footer ' + this.props.className
    }, React.createElement("div", {
      "className": "container"
    }, React.createElement("div", {
      "className": "row"
    }, React.createElement("div", {
      "className": "col s12 m6 l6"
    }, React.createElement("h5", {
      "className": "white-text"
    }, "Quick links"), React.createElement(LinkList, {
      "items": this.props.items,
      "anchorClassName": "white-text"
    }), React.createElement("iframe", {
      "src": "https://ghbtns.com/github-btn.html?user=soundscape&type=follow&size=large",
      "frameBorder": "0",
      "scrolling": "0",
      "width": "220px",
      "height": "30px"
    })), React.createElement("div", {
      "className": "col s12 m6 l6 white-text"
    }, React.createElement("h5", {
      "className": "white-text"
    }, "Contact info"), React.createElement("h6", {
      "className": "mdi-action-home"
    }, "Address"), React.createElement("p", null, "106 Bassett Road, Auckland, NZ"), React.createElement("h6", {
      "className": "mdi-hardware-phone-android"
    }, "Phone Number"), React.createElement("p", null, "+64 22 368 5125"), React.createElement("h6", {
      "className": "mdi-action-open-in-browser"
    }, "Website"), React.createElement("p", null, "sublime-portfolio.herokuapp.com\x2F")))), React.createElement("div", {
      "className": "footer-copyright"
    }, React.createElement("div", {
      "className": "container"
    }, "Made by ", React.createElement("a", {
      "href": "#intro",
      "className": "teal-text text-lighten-3"
    }, "Shaun Farrell"), " with ", React.createElement("a", {
      "href": "http://materializecss.com/",
      "target": "_blank",
      "className": "teal-text text-lighten-3"
    }, "Materialize"))));
  }
});
