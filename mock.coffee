express = require 'express'

site = express.createServer()
site.use "/assets", express.static(__dirname + "/assets")

site.configure ->
  site.set 'views', __dirname + '/mockup'
  site.set 'view engine', 'ejs'

site.get '/', (req, res) ->
  res.render 'index'

site.get '/register', (req, res) ->
  res.render 'register'

site.get '/shows', (req, res) ->
  res.render 'shows'

site.get '/schedules', (req, res) ->
  res.render 'schedules'

site.get '/report', (req, res) ->
  res.render 'report'

site.listen 4567
