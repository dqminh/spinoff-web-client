_ = require "underscore"
fs = require "fs"
http = require "http"
httpProxy = require('http-proxy')
express = require "express"

remoteServer = "localhost"

site = express.createServer()

site.use "/app", express.static("./app")
site.use "/assets", express.static("./assets")
site.use express.favicon("./favicon.ico")

# Routes
site.get "/", (request, response) ->
  fs.createReadStream("./index.html").pipe(response);

proxy = new httpProxy.HttpProxy(
	target: 
    host: remoteServer,
    port: 4567)

# proxying all request to `remoteServer`
site.all "*", (request, response) ->
  proxy.proxyRequest request, response

site.listen(8000)
