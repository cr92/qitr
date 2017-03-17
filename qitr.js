var express = require('express');
var http = require("http");
var path = require("path");
var socketio = require("socket.io");
var ws = require("ws");
var bodyParser = require("body-parser");
var apis = require('./apis/apis');
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var server = http.createServer(app);

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.get('/enter', function (request, response) {
  response.sendFile(__dirname + '/public/enter.html');
});

app.post('/enter', function (request, response) {
  console.log(request.body);
  var input_data_string = request.body.data_string;
  apis.updatePosition(input_data_string, function (error, result) {
    if (error) {
      console.log('Record Failure');
      console.log(error);
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(error));
      // response.status(500).send({
      //   message: '500 - Server Error'
      // });
    } else {
      console.log('Record Successful');
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(result));
    }
  });
});

app.get('/showAll', function (request, response) {
  apis.fetchAllPositions(request, function (error, data) {
    if (data) {
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(data));
    } else {
      response.status(404).send({
        message: '404 - Not Found'
      });
    }
  });
});

app.get('/instrument/*', function (request, response) {
  apis.fetchPosition(request, function (error, data) {
    if (data) {
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(data));
    } else {
      response.status(404).send({
        message: '404 - Not Found'
      });
    }
  });
});

app.get('*', function (request, response) {
  response.sendFile(__dirname + '/public/404.html');
});



// Experimenting with sockets
var io = socketio.listen(server);

// Logs in server console, when a client connects
io.sockets.on('connection', function (socket) {
  console.log('New Client connected');
});

// Sends a message every 5 seconds to connected clients
setInterval(function () {
  io.sockets.emit('message', {
    message: "Hello Yu..."
  });
}, 5000);



server.listen('9090', function () {
  console.log('on port 9090: ');
});