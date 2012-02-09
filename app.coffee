_ = require "underscore"
fs = require "fs"
http = require "http"
express = require "express"

remoteServer = "spinoff-server.heroku.com"

site = express.createServer()

site.use "/app", express.static("./app")
site.use "/assets", express.static("./assets")
site.use express.favicon("./favicon.ico")

# Routes
site.get "/", (request, response) ->
  fs.createReadStream("./index.html").pipe(response);

process = (request, response) ->
  proxy_headers = _.clone request.headers
  proxy_headers.host = remoteServer
  proxy_options =
    host: remoteServer
    port: 80
    headers: proxy_headers
    path: request.path
    method: request.method

  proxy_request = http.request proxy_options, (proxy_response) ->
    proxy_response.addListener 'data', (chunk) ->
      response.write chunk, 'binary'
    proxy_response.addListener 'end', ->
      response.end()
    response.writeHead proxy_response.statusCode, proxy_response.headers

  request.addListener 'data', (chunk) ->
    proxy_request.write chunk, 'binary'

  request.addListener 'end', ->
    proxy_request.end()

# proxying all request to `remoteServer`
site.get "*", process
site.post "*", process
site.delete "*", process
site.put "*", process
site.listen(8000)
