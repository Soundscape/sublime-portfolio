var Footer, LinkList, React, items;

LinkList = require('./link.list');

React = require('react');

items = [
  {
    href: '#intro',
    text: 'About me'
  }, {
    href: '#projects',
    text: 'Projects'
  }, {
    href: '#contact',
    text: 'Contact'
  }
];

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
      "items": items,
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
    }, "Address"), React.createElement("p", null, "Nr. 13, 323 York Avenue, Johannesburg, SA"), React.createElement("h6", {
      "className": "mdi-hardware-phone-android"
    }, "Phone Number"), React.createElement("p", null, "+27 78 246 9605"), React.createElement("h6", {
      "className": "mdi-action-open-in-browser"
    }, "Website"), React.createElement("p", null, "sublime-dev.firebaseapp.com")))), React.createElement("div", {
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
