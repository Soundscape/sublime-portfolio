var Parallax, React;

React = require('react');

module.exports = Parallax = React.createClass({
  render: function() {
    return React.createElement("div", {
      "className": "container"
    }, React.createElement("div", {
      "id": this.props.id,
      "className": "section scrollspy"
    }, this.props.children));
  }
});
