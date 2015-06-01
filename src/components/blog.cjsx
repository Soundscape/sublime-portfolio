React = require 'react'
NavBar = require './navbar'
window.db = require '../modules/firebase'
Footer = require './footer'
BlogList = require './blog.list'
markdown = require('markdown').markdown

items = [
  { href: '/#intro', text: 'About me' },
  { href: '/#projects', text: 'Projects' },
  { href: '/#contact', text: 'Contact' },
  { href: '#!', text: 'Blog' }
]

renderEntry = () ->
  $.get 'https://sublime-dev.firebaseio.com/blog/' + location.hash.substr(1) + '.json', (data) ->
    $('#entry').html(markdown.toHTML data.content)

window.addEventListener 'hashchange', () -> renderEntry()
if location.hash then renderEntry()

React.render(
  <div>
    <NavBar className="blue-grey darken-3" title="portfolio" items={items} />
    
    <div className="row">
      <BlogList size="3" className="col s12 show-on-small hide-on-med-and-up" />
      
      <div className="col l9 m9 s12" id="entry">
      </div>
      
      <BlogList size="5" className="col l3 m3 hide-on-small-only" />
    </div>
    
    <Footer className="blue-grey darken-2" items={items} />
  </div>,
  document.getElementById 'content'
)
