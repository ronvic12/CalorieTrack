// server/server.js
require("dotenv").config()
const webSocketsServerPort = process.env.PORT || 3000;
const webSocketServer = require('websocket').server;
const http = require('http');
const express = require('express');
const cors = require('cors'); // for all routers and diff ports
const bodyParser = require('body-parser');
const app = express();

// Set up your express app with middleware and routes
app.use(express.json()); // middleware to parse JSON requests

app.use(cors());

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

app.post('/users',(req,res) => {
  console.log(req.body)
})
// Spinning the http server and the websocket server.
const server = http.createServer(app);
server.listen(webSocketsServerPort);
console.log(`Server is running on http://localhost:${webSocketsServerPort}`);


const wsServer = new webSocketServer({
  httpServer: server
});


const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ', message.utf8Data);

      // broadcasting message to all connected clients
      for(key in clients) {
        clients[key].sendUTF(message.utf8Data);
        console.log('sent Message to: ', clients[key]);
      }
    }
  })
});
