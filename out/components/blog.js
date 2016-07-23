var BlogList, Footer, NavBar, React, items, markdown, renderEntry;

React = require('react');

NavBar = require('./navbar');

Footer = require('./footer');

BlogList = require('./blog.list');

markdown = require('markdown').markdown;

items = [
  {
    href: '/#intro',
    text: 'About me'
  }, {
    href: '/#projects',
    text: 'Projects'
  }, {
    href: '/#contact',
    text: 'Contact'
  }, {
    href: '#!',
    text: 'Blog'
  }
];

renderEntry = function() {
  return $.get('https://sublime-dev.firebaseio.com/blog/' + location.hash.substr(1) + '.json', function(data) {
    return $('#entry').html(markdown.toHTML(data.content));
  });
};

window.addEventListener('hashchange', function() {
  return renderEntry();
});

if (location.hash) {
  renderEntry();
}

React.render(React.createElement("div", null, React.createElement(NavBar, {
  "className": "blue-grey darken-3",
  "title": "portfolio",
  "items": items
}), React.createElement("div", {
  "className": "row"
}, React.createElement(BlogList, {
  "size": "3",
  "className": "col s12 show-on-small hide-on-med-and-up"
}), React.createElement("div", {
  "className": "col l9 m9 s12",
  "id": "entry"
}), React.createElement(BlogList, {
  "size": "5",
  "className": "col l3 m3 hide-on-small-only"
})), React.createElement(Footer, {
  "className": "blue-grey darken-2",
  "items": items
})), document.getElementById('content'));
