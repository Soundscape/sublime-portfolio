Application = require('sublime-application').Application
bodyParser = require 'body-parser'
helmet = require 'helmet'
csrf = require 'csurf'
express = require 'express'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
compress = require 'compression'
cons = require 'consolidate'

Mail = require 'sublime-mail'
mailer = new Mail.Mailer process.env.MANDRILL_KEY

cfg =
  server:
    staticCache: 6048000000
    ssl: false
    key: ''
    cert: ''

server = new Application cfg.server

server.use (app) ->
  app.use(require('connect-livereload')())

  app.cookieParser = cookieParser()

  app.engine 'html', cons.handlebars
  app.set 'view engine', 'html'
  app.set 'views', './out/views'

  app.use bodyParser.json()
  app.use bodyParser.urlencoded(extended: true)
  app.use app.cookieParser
  app.use compress()

  app.get '/', (req, res) ->
    res.render 'home'

  app.post '/mail', (req, res) ->
    mailer.send(
      process.env.WEBMASTER_EMAIL
      req.body.email
      "Message from #{req.body.first_name} #{req.body.last_name}"
      req.body.content
    )
    res.status(200).end()

  app.use express.static(
    './out/',
    maxAge: cfg.server.staticCache
  )

server.start()
