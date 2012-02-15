(function() {
  var express, fs, http, httpProxy, proxy, remoteServer, site, _;

  _ = require("underscore");

  fs = require("fs");

  http = require("http");

  httpProxy = require('http-proxy');

  express = require("express");

  remoteServer = "localhost";

  site = express.createServer();

  site.use("/app", express.static("./app"));

  site.use("/assets", express.static("./assets"));

  site.use(express.favicon("./favicon.ico"));

  site.get("/", function(request, response) {
    return fs.createReadStream("./index.html").pipe(response);
  });

  proxy = new httpProxy.HttpProxy({
    target: {
      host: remoteServer,
      port: 4567
    }
  });

  site.all("*", function(request, response) {
    return proxy.proxyRequest(request, response);
  });

  site.listen(8000);

}).call(this);
