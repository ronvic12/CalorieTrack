var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "ronvic12",
  password: "Lebronvic30!",
  database: "calorietrack",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});