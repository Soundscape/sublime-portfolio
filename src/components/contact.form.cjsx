React = require 'react'
mailer = require '../modules/mailer'

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
      <textarea placeholder="Your Message" required className="materialize-textarea"></textarea>
      <button type="submit" name="action" className="btn waves-effect waves-light right">
        Submit
        <i className="mdi-content-send right"></i>
      </button>
    </form>

  handleSubmit: (e) ->
    e.preventDefault()
    window .q = mailer
    mailer.send(
      'shaunfarrell@g.harvard.edu'
      $('#email').val()
      'Message from ' + $('#first_name').val() + ' ' + $('#last_name').val()
      $('textarea').val()
    )
