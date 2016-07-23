var ProjectListItem, React;

React = require('react');

module.exports = ProjectListItem = React.createClass({
  render: function() {
    var url;
    url = "https://github.com/" + this.props.item.user + "/" + this.props.item.repo;
    return React.createElement("li", {
      "className": "collection-item avatar project-list-item"
    }, React.createElement("i", {
      "className": this.props.className || 'mdi-file-folder-open circle blue-grey'
    }), React.createElement("span", {
      "className": "title"
    }, this.props.item.title), React.createElement("p", null, this.props.item.summary), React.createElement("a", {
      "href": url,
      "className": "secondary-content waves-effect blue-text",
      "target": "_blank"
    }, "Github ", React.createElement("i", {
      "className": "mdi-action-launch"
    })));
  }
});
