var $, Project, Projects, React, db;

$ = require('jquery');

React = require('react');

Project = require('./project');

db = require('../modules/firebase');

module.exports = Projects = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  loadData: function() {
    return db.query('project').on('value', (function(_this) {
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
        return _this.setState({
          data: items.sort(function(a, b) {
            return a.title > b.title;
          })
        });
      };
    })(this));
  },
  componentWillMount: function() {
    return this.loadData();
  },
  render: function() {
    var rows, x, y;
    rows = this.state.data.length / 3 + (this.state.data.length % 3 !== 0 ? 1 : 0) - 1;
    return React.createElement("div", {
      "className": "projects"
    }, (function() {
      var i, ref, results;
      results = [];
      for (y = i = 0, ref = rows; 0 <= ref ? i <= ref : i >= ref; y = 0 <= ref ? ++i : --i) {
        results.push(React.createElement("div", {
          "className": "row",
          "key": y
        }, (function() {
          var j, results1;
          results1 = [];
          for (x = j = 0; j <= 2; x = ++j) {
            results1.push(React.createElement(Project, {
              "key": y * 3 + x,
              "item": this.state.data[y * 3 + x]
            }));
          }
          return results1;
        }).call(this)));
      }
      return results;
    }).call(this));
  }
});
