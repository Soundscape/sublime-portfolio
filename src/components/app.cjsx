React = require 'react'
NavBar = require './navbar'
Parallax = require './parallax'
ParallaxSection = require './parallax.section'
ContactForm = require './contact.form'
ProjectList = require './project.list'
Footer = require './footer'
Markdown = require './markdown' 

React.render(
  <div>
    <NavBar className="blue-grey darken-3" title="portfolio" />

    <ParallaxSection id="first" src="assets/images/background22.jpg">
      <br />
      <br />
      <h1 className="header center teal-text">Shaun Farrell</h1>
      <div className="row center">
        <h5 className="header col s12 light">Web Developer</h5>
      </div>
      <div className="row center">
        <a href="#contact" className="btn-large waves-effect waves-light">Contact me</a>
      </div>
      <br />
      <br />
    </ParallaxSection>
    <Parallax id="intro" title="About me">
      <div className="row">
        <div className="col s12 center">
          <h5>About me</h5>
          <p className="flow-text light">
            Hi there! I am Shaun Farrell and welcome to my portfolio. I am a web developer with over 10 years experience in the .NET stack. NodeJS is currently my personal favourite, with Java not far behind. I am currently studying distributed systems through <a href="http://www.extension.harvard.edu/" target="_blank">Harvard Extension School</a>.
          </p>
        </div>
      </div>
    </Parallax>

    <ParallaxSection src="assets/images/background21.jpg">
      <div className="row center">
        <h3 className="header col s12 cyan-text text-lighten-1">
          <i className="mdi-content-send"></i>
        </h3>
        <h5 className="header col s12 light">Featured projects</h5>
      </div>
    </ParallaxSection>
    <Parallax id="projects" title="Featured projects">
      <ProjectList size="4" />
    </Parallax>

    <ParallaxSection src="assets/images/background23.jpg">
      <div className="row center">
        <h3 className="header col s12 cyan-text text-lighten-1">
          <i className="mdi-content-send"></i>
        </h3>
        <h5 className="header col s12 light">Contact me</h5>
      </div>
    </ParallaxSection>
    <Parallax id="contact" title="Contact me">
      <div className="row">
        <ContactForm />
      </div>
    </Parallax>

    <Footer className="blue-grey darken-2" />
  </div>,
  document.getElementById 'content'
)
