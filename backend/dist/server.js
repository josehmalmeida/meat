"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var https = require("https");
var fs = require("fs");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.post('/login', auth_1.handleAuthentication);
server.use('/orders', authz_1.handleAuthorization);
server.use(router);
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running secure');
});
