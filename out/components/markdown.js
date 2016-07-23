var Markdown, React, markdown;

React = require('react');

markdown = require('markdown').markdown;

module.exports = Markdown = React.createClass({
  getInitialState: function() {
    return {
      markdown: this.props.markdown || ''
    };
  },
  setContent: function(markdown) {
    return this.setState({
      markdown: markdown || ''
    });
  },
  render: function() {
    return React.createElement("div", {
      "className": this.props.className + ' markdown',
      "dangerouslySetInnerHTML": {
        __html: markdown.toHTML(this.state.markdown)
      }
    });
  }
});
