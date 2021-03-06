var ParallaxSection, React;

React = require('react');

module.exports = ParallaxSection = React.createClass({
  render: function() {
    return React.createElement("div", {
      "id": this.props.id,
      "className": "parallax-container valign-wrapper"
    }, React.createElement("div", {
      "className": "section no-pad-bot"
    }, React.createElement("div", {
      "className": "container"
    }, this.props.children)), React.createElement("div", {
      "className": "parallax"
    }, React.createElement("img", {
      "alt": "",
      "src": this.props.src
    })));
  }
});
