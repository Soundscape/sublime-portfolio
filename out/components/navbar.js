var LinkList, NavBar, React;

LinkList = require('./link.list');

React = require('react');

module.exports = NavBar = React.createClass({
  render: function() {
    return React.createElement("nav", {
      "role": "navigation",
      "className": this.props.className
    }, React.createElement("div", {
      "className": "nav-wrapper container"
    }, React.createElement("a", {
      "id": "logo-container",
      "href": "/",
      "className": "brand-logo"
    }, this.props.title), React.createElement(LinkList, {
      "items": this.props.items,
      "className": "right hide-on-med-and-down"
    }), React.createElement("div", {
      "id": "nav-mobile",
      "className": "side-nav"
    }, React.createElement(LinkList, {
      "items": this.props.items,
      "className": "table-of-contents"
    })), React.createElement("a", {
      "href": "#!",
      "data-activates": "nav-mobile",
      "className": "button-collapse"
    }, React.createElement("i", {
      "className": "mdi-navigation-menu"
    }))));
  }
});
