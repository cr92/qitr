var express = require('express');
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var apis=require('./apis/apis');
var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (request, response) {
  console.log('boo-hoo');
});

app.get('/showAll', function (request, response) {
  console.log('hoo-hoo');
});

app.get('/instrument/*', function (request, response) {
  console.log('yoo-hoo');
});

var server = app.listen(9090, function () {
  var port = server.address().port;
  console.log("listening at localhost:%s",port)
});