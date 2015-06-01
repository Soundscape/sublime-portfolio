var $, BlogList, BlogListItem, Enumerable, React, db;

$ = require('jquery');

React = require('react');

db = require('../modules/firebase');

Enumerable = require('linq');

BlogListItem = require('./blog.list.item');

module.exports = BlogList = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      size: parseInt(this.props.size || 5)
    };
  },
  loadData: function() {
    return db.query('blog', {
      limit: this.state.size
    }).on('value', (function(_this) {
      return function(s) {
        var data, items;
        items = [];
        data = s.val();
        Object.getOwnPropertyNames(data || {}).forEach(function(key) {
          var item;
          item = data[key];
          item._id = key;
          return items.push(item);
        });
        items = items.sort(function(a, b) {
          return a.title > b.title;
        });
        _this.setState({
          items: items
        });
        if (items.length > 0) {
          return _this.getDOMNode().classList.remove('hide');
        }
      };
    })(this));
  },
  componentWillMount: function() {
    return this.loadData();
  },
  render: function() {
    var i;
    return React.createElement("div", {
      "className": this.props.className + ' blog-list hide'
    }, React.createElement("ul", {
      "className": "collection with-header"
    }, React.createElement("li", {
      "className": "collection-header"
    }, React.createElement("h5", null, "Latest entries")), (function() {
      var j, len, ref, results;
      ref = this.state.items;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        results.push(React.createElement(BlogListItem, {
          "item": i
        }));
      }
      return results;
    }).call(this)));
  }
});
