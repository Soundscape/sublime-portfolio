var $, ContactForm, React;

React = require('react');

$ = require('jquery');

module.exports = ContactForm = React.createClass({
  render: function() {
    return React.createElement("form", {
      "className": "col s12",
      "onSubmit": this.handleSubmit
    }, React.createElement("div", {
      "className": "row"
    }, React.createElement("div", {
      "className": "input-field col s6"
    }, React.createElement("input", {
      "id": "first_name",
      "type": "text",
      "required": true,
      "className": "validate"
    }), React.createElement("label", {
      "for": "first_name",
      "className": ""
    }, "First Name")), React.createElement("div", {
      "className": "input-field col s6"
    }, React.createElement("input", {
      "id": "last_name",
      "type": "text",
      "required": true,
      "className": "validate"
    }), React.createElement("label", {
      "for": "last_name"
    }, "Last Name"))), React.createElement("div", {
      "className": "row"
    }, React.createElement("div", {
      "className": "input-field col s12"
    }, React.createElement("input", {
      "id": "email",
      "type": "email",
      "required": true,
      "className": "validate"
    }), React.createElement("label", {
      "for": "email"
    }, "E-mail"))), React.createElement("textarea", {
      "id": "message",
      "placeholder": "Your Message",
      "required": true,
      "className": "materialize-textarea"
    }), React.createElement("button", {
      "type": "submit",
      "name": "action",
      "className": "btn waves-effect waves-light right"
    }, "Submit", React.createElement("i", {
      "className": "mdi-content-send right"
    })));
  },
  handleSubmit: function(e) {
    e.preventDefault();
    $.post('/mail', {
      email: $('#email').val(),
      first_name: $('#first_name').val(),
      last_name: $('#last_name').val(),
      content: $('#message').val()
    });
    return $('form')[0].reset();
  }
});
