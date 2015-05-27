var Markdown, React, markdown;

React = require('react');

markdown = require('markdown').markdown;

module.exports = Markdown = React.createClass({
  render: function() {
    return React.createElement("div", {
      "className": this.props.className + ' markdown',
      "dangerouslySetInnerHTML": {
        __html: markdown.toHTML(this.props.markdown)
      }
    });
  }
});
