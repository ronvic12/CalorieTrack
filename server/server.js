// server/server.js
require("dotenv").config()
const webSocketsServerPort = process.env.PORT || 3000;
const webSocketServer = require('websocket').server;
const http = require('http');
const express = require('express');
const cors = require('cors'); // for all routers and diff ports
const bodyParser = require('body-parser');
const app = express();
const { router } = require('./routers/index');
const cookieSession = require("cookie-session");

// Set up your express app with middleware and routes
app.use(express.json()); // middleware to parse JSON requests
app.use(cors());
// Middleware to parse JSON in the request body
app.use(bodyParser.json());
// app.use('/api', router);
app.use(express.urlencoded({extended: true}));


app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);

require("./components/auth/auth")(app);

// Spinning the http server and the websocket server.
const server = http.createServer(app);
server.listen(webSocketsServerPort);
console.log(`Server is running on http://localhost:${webSocketsServerPort}`);