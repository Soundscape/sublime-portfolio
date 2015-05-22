(function() {
  var Application, Mail, bodyParser, cfg, compress, cons, cookieParser, csrf, express, helmet, mailer, server;

  Application = require('sublime-application').Application;

  bodyParser = require('body-parser');

  helmet = require('helmet');

  csrf = require('csurf');

  express = require('express');

  bodyParser = require('body-parser');

  cookieParser = require('cookie-parser');

  compress = require('compression');

  cons = require('consolidate');

  Mail = require('sublime-mail');

  mailer = new Mail.Mailer(process.env.MANDRILL_KEY);

  cfg = {
    server: {
      staticCache: 6048000000,
      ssl: false,
      key: '',
      cert: ''
    }
  };

  server = new Application(cfg.server);

  server.use(function(app) {
    app.use(require('connect-livereload')());
    app.cookieParser = cookieParser();
    app.engine('html', cons.handlebars);
    app.set('view engine', 'html');
    app.set('views', './out/views');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(app.cookieParser);
    app.use(compress());
    app.get('/', function(req, res) {
      return res.render('home');
    });
    app.post('/mail', function(req, res) {
      mailer.send(process.env.WEBMASTER_EMAIL, req.body.email, "Message from " + req.body.first_name + " " + req.body.last_name, req.body.content);
      return res.status(200).end();
    });
    return app.use(express["static"]('./out/', {
      maxAge: cfg.server.staticCache
    }));
  });

  server.start();

}).call(this);
