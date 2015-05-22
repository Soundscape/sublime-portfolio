var Chance, ContactForm, Footer, NavBar, Parallax, ParallaxSection, Projects, React, chance, copy, i;

React = require('react');

NavBar = require('./navbar');

Parallax = require('./parallax');

ParallaxSection = require('./parallax.section');

ContactForm = require('./contact.form');

Projects = require('./projects');

Footer = require('./footer');

Chance = require('chance');

chance = new Chance();

copy = (function() {
  var j, results;
  results = [];
  for (i = j = 1; j <= 3; i = ++j) {
    results.push(chance.paragraph());
  }
  return results;
})();

React.render(React.createElement("div", null, React.createElement(NavBar, {
  "className": "blue-grey darken-3",
  "title": "portfolio"
}), React.createElement(ParallaxSection, {
  "id": "first",
  "src": "https://sublime-dev.firebaseapp.com/assets/images/background22.jpg"
}, React.createElement("br", null), React.createElement("br", null), React.createElement("h1", {
  "className": "header center teal-text"
}, "Shaun Farrell"), React.createElement("div", {
  "className": "row center"
}, React.createElement("h5", {
  "className": "header col s12 light"
}, "Web Developer")), React.createElement("div", {
  "className": "row center"
}, React.createElement("a", {
  "href": "#contact",
  "className": "btn-large waves-effect waves-light"
}, "Contact me")), React.createElement("br", null), React.createElement("br", null)), React.createElement(Parallax, {
  "id": "intro",
  "title": "About me"
}, React.createElement("div", {
  "className": "row"
}, React.createElement("div", {
  "className": "col s12 center"
}, React.createElement("h5", null, "About me"), React.createElement("p", {
  "className": "flow-text light"
}, "Hi there! I am Shaun Farrell and welcome to my portfolio. I am a web developer with over 10 years experience in the .NET stack. NodeJS is currently my personal favourite, with Java not far behind. I am currently studying distributed systems through ", React.createElement("a", {
  "href": "http://www.extension.harvard.edu/",
  "target": "_blank"
}, "Harvard Extension School"), ".")))), React.createElement(ParallaxSection, {
  "src": "https://sublime-dev.firebaseapp.com/assets/images/background21.jpg"
}, React.createElement("div", {
  "className": "row center"
}, React.createElement("h3", {
  "className": "header col s12 cyan-text text-lighten-1"
}, React.createElement("i", {
  "className": "mdi-content-send"
})), React.createElement("h5", {
  "className": "header col s12 light"
}, "Featured projects"))), React.createElement(Parallax, {
  "id": "projects",
  "title": "Featured projects"
}, React.createElement(Projects, null)), React.createElement(ParallaxSection, {
  "src": "https://sublime-dev.firebaseapp.com/assets/images/background23.jpg"
}, React.createElement("div", {
  "className": "row center"
}, React.createElement("h3", {
  "className": "header col s12 cyan-text text-lighten-1"
}, React.createElement("i", {
  "className": "mdi-content-send"
})), React.createElement("h5", {
  "className": "header col s12 light"
}, "Contact me"))), React.createElement(Parallax, {
  "id": "contact",
  "title": "Contact me"
}, React.createElement("div", {
  "className": "row"
}, React.createElement(ContactForm, null))), React.createElement(Footer, {
  "className": "blue-grey darken-2"
})), document.getElementById('content'));
