React = require 'react'
$ = require 'jquery'

module.exports = ContactForm = React.createClass
  render: () ->
    <form className="col s12" onSubmit={@handleSubmit}>
      <div className="row">
        <div className="input-field col s6">
          <input id="first_name" type="text" required className="validate" />
          <label for="first_name" className="">First Name</label>
        </div>
        <div className="input-field col s6">
          <input id="last_name" type="text" required className="validate" />
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="email" type="email" required className="validate" />
          <label for="email">E-mail</label>
        </div>
      </div>
      <textarea id="message" placeholder="Your Message" required className="materialize-textarea"></textarea>
      <button type="submit" name="action" className="btn waves-effect waves-light right">
        Submit
        <i className="mdi-content-send right"></i>
      </button>
    </form>

  handleSubmit: (e) ->
    e.preventDefault()
    $.post '/mail', {
      email: $('#email').val()
      first_name: $('#first_name').val()
      last_name: $('#last_name').val()
      content: $('#message').val()
    }
    
    $('form')[0].reset()
