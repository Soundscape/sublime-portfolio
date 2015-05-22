var Project, React;

React = require('react');

module.exports = Project = React.createClass({
  render: function() {
    var url;
    if (!this.props.item) {
      return React.createElement("div", null);
    } else {
      url = "https://ghbtns.com/github-btn.html?user=" + this.props.item.user + "&repo=" + this.props.item.repo + "&type=star&count=false&size=large";
      return React.createElement("div", {
        "className": "col l4 m4 s12 center project"
      }, React.createElement("div", {
        "className": "card"
      }, React.createElement("div", {
        "className": "card-image waves-effect waves-block waves-light"
      }, React.createElement("img", {
        "className": "activator",
        "src": this.props.item.img
      })), React.createElement("div", {
        "className": "card-content"
      }, React.createElement("span", {
        "className": "card-title activator grey-text text-darken-4"
      }, this.props.item.title, React.createElement("i", {
        "className": "mdi-navigation-more-vert right"
      }))), React.createElement("div", {
        "className": "card-reveal"
      }, React.createElement("span", {
        "className": "card-title grey-text text-darken-4"
      }, this.props.item.title, React.createElement("i", {
        "className": "mdi-navigation-close right"
      })), React.createElement("p", null, this.props.item.summary), React.createElement("iframe", {
        "src": url,
        "className": "project-button",
        "frameBorder": "0",
        "scrolling": "0"
      }))));
    }
  }
});
