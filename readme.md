Spinoff web client
==================

## Requirements

To run all the server, you need `node`, `npm`, and `supervisor`. To install
`supervisor`, install `node` and `npm` first, and run `npm install -g
supervisor` to have `supervisor` available globally.

`supervisor` also takes care of the reloading of coffeescript-based nodejs
server.

## Mock server

To design and preview pages of the web client, use the mock server. It's
written in CoffeeScript, so you have to run `supervisor mock.coffee` to serve
the request.

## Proxy server

We have a proxy server that is also used to server our web client at
`app.coffee`. Run it with `proxy` to establish connection with spinoff
remote server.

By default, all requests except "/" and assets based will be proxied to
spinoff server.
