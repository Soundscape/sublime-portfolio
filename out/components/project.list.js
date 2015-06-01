var $, Enumerable, ProjectList, ProjectListItem, React, db;

$ = require('jquery');

React = require('react');

ProjectListItem = require('./project.list.item');

db = require('../modules/firebase');

Enumerable = require('linq');

module.exports = ProjectList = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      items: [],
      size: this.props.size || 5,
      index: 0,
      pages: 1
    };
  },
  loadData: function() {
    return db.query('project').on('value', (function(_this) {
      return function(s) {
        var current, data, items, pages;
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
        pages = items.length / _this.state.size + (items.length % _this.state.size === 0 ? 0 : 1);
        current = Enumerable.from(items).skip(_this.state.index * _this.state.size).take(_this.state.size).toArray();
        _this.setState({
          data: items,
          pages: pages,
          items: current
        });
        return _this.getDOMNode().classList.remove('hide');
      };
    })(this));
  },
  move: function(e) {
    var page;
    page = parseInt(e.target.getAttribute('data-page'));
    return this.moveTo(page);
  },
  moveTo: function(page) {
    page = page < 0 ? 0 : page;
    page = page >= this.state.pages ? this.state.pages - 1 : page;
    this.setState({
      index: page,
      items: Enumerable.from(this.state.data).skip(page * this.state.size).take(this.state.size).toArray()
    });
    $('.pagination li.page.active', this.getDOMNode()).attr('class', 'waves-effect page');
    return $('.pagination li.page[data-page=' + page + ']', this.getDOMNode()).attr('class', 'active teal page');
  },
  prev: function() {
    var page;
    page = this.state.index - 1;
    return this.moveTo(page);
  },
  next: function() {
    var page;
    page = this.state.index + 1;
    return this.moveTo(page);
  },
  componentWillMount: function() {
    return this.loadData();
  },
  render: function() {
    var i;
    return React.createElement("div", {
      "className": "project-list row hide"
    }, React.createElement("ul", {
      "className": "collection"
    }, (function() {
      var j, len, ref, results;
      ref = this.state.items;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        results.push(React.createElement(ProjectListItem, {
          "item": i
        }));
      }
      return results;
    }).call(this)), React.createElement("ul", {
      "className": "pagination"
    }, React.createElement("li", {
      "className": (this.state.index === 0 ? 'disabled' : 'waves-effect'),
      "onClick": this.prev
    }, React.createElement("a", {
      "href": "#!"
    }, React.createElement("i", {
      "className": "mdi-navigation-chevron-left"
    }))), (function() {
      var j, ref, results;
      results = [];
      for (i = j = 1, ref = this.state.pages; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
        results.push(React.createElement("li", {
          "className": (i - 1 === this.state.index ? 'active teal page' : 'waves-effect page'),
          "onClick": this.move,
          "data-page": i - 1
        }, React.createElement("a", {
          "href": "#!",
          "data-page": i - 1
        }, i)));
      }
      return results;
    }).call(this), React.createElement("li", {
      "className": (this.state.index === this.state.pages - 1 ? 'disabled' : 'waves-effect'),
      "onClick": this.next
    }, React.createElement("a", {
      "href": "#!"
    }, React.createElement("i", {
      "className": "mdi-navigation-chevron-right"
    })))), React.createElement("span", {
      "className": "right"
    }, this.state.data.length, " projects available"));
  }
});
