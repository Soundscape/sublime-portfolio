var $, LinkList, React;

$ = require('jquery');

React = require('react');

module.exports = LinkList = React.createClass({
  render: function() {
    var items;
    items = this.props.items.map((function(_this) {
      return function(item) {
        return React.createElement("li", {
          "className": _this.props.itemClassName
        }, React.createElement("a", {
          "href": item.href,
          "className": _this.props.anchorClassName
        }, item.text));
      };
    })(this));
    return React.createElement("ul", {
      "className": this.props.className
    }, items);
  }
});
