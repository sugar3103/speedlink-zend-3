var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var url = require('url');
var io = require('socket.io');
var log = require('./log');

class Server {
  
  constructor(options) {
    this.options = options
    this.io = '';
  }

  init() {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.serverProtocol().then(function () {
        log.Log.success("Running at " + that.options.host + " on port " + that.options.port);
        resolve(that.io);
      }, function (error) { return reject(error); });
    });
  }

  getPort() {
    let portRegex = /([0-9]{2,5})[\/]?$/;
    let portToUse = String(this.options.port).match(portRegex); // index 1 contains the cleaned port number only
    return Number(portToUse[1]);
  }

  serverProtocol() {
    var that = this;
    return new Promise(function (resolve, reject) {
      if (that.options.protocol == 'https') {
        that.secure().then(() => {
          resolve(that.httpServer(true));
        }, error => reject(error));
      } else {
        resolve(that.httpServer(false));
      }
    });
  };

  secure() {
    var that = this;
    return new Promise((resolve, reject) => {
      if (!that.options.sslCertPath || !that.options.sslKeyPath) {
        reject('SSL paths are missing in server config.');
      }

      Object.assign(that.options, {
        cert: fs.readFileSync(that.options.sslCertPath),
        key: fs.readFileSync(that.options.sslKeyPath),
        ca: (that.options.sslCertChainPath) ? fs.readFileSync(that.options.sslCertChainPath) : '',
        passphrase: that.options.sslPassphrase,
      });

      resolve(that.options);
    });
  }

  httpServer(secure) {
    this.express = express();

    if (secure) {
      var httpServer = https.createServer(this.options, this.express);
    } else {
      var httpServer = http.createServer(this.express);
    }

    httpServer.listen(this.getPort(), this.options.host);


    return this.io = io(httpServer, this.options.socketio);
  }

}

exports.Server = Server;