var BlogListItem, React;

React = require('react');

module.exports = BlogListItem = React.createClass({
  render: function() {
    return React.createElement("li", {
      "className": "collection-item blog-list-item"
    }, React.createElement("div", null, React.createElement("a", {
      "href": '#' + this.props.item._id
    }, this.props.item.title), React.createElement("br", null), React.createElement("span", null, this.props.item.summary)));
  }
});
