(function() {
  var express, fs, http, process, remoteServer, site, _;

  _ = require("underscore");

  fs = require("fs");

  http = require("http");

  express = require("express");

  remoteServer = "spinoff-server.heroku.com";

  site = express.createServer();

  site.use("/app", express.static("./app"));

  site.use("/assets", express.static("./assets"));

  site.use(express.favicon("./favicon.ico"));

  site.get("/", function(request, response) {
    return fs.createReadStream("./index.html").pipe(response);
  });

  process = function(request, response) {
    var proxy_headers, proxy_options, proxy_request;
    proxy_headers = _.clone(request.headers);
    proxy_headers.host = remoteServer;
    proxy_options = {
      host: remoteServer,
      port: 80,
      headers: proxy_headers,
      path: request.path,
      method: request.method
    };
    proxy_request = http.request(proxy_options, function(proxy_response) {
      proxy_response.addListener('data', function(chunk) {
        return response.write(chunk, 'binary');
      });
      proxy_response.addListener('end', function() {
        return response.end();
      });
      return response.writeHead(proxy_response.statusCode, proxy_response.headers);
    });
    request.addListener('data', function(chunk) {
      return proxy_request.write(chunk, 'binary');
    });
    return request.addListener('end', function() {
      return proxy_request.end();
    });
  };

  site.get("*", process);

  site.post("*", process);

  site["delete"]("*", process);

  site.put("*", process);

  site.listen(8000);

}).call(this);
