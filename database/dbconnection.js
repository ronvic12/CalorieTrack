var mysql = require('mysql2');
require('dotenv').config();

class MYSQLConnector{

  get DB_USERNAME () { return "ronvic12" } 
  get DB_NAME () {return "calorietrack"}
  get DB_PASSWORD () {return "Lebronvic30!"}
  get DB_ADDRESS () {return "127.0.0.1"}
  get DB_POOLSIZE () {return 10}
  constructor(){

    this.internalPool = mysql.createConnection({
        host: this.DB_ADDRESS,
        user: this.DB_USERNAME,
        password: this.DB_PASSWORD,
        database: this.DB_NAME,
        waitForConnections: true,
        connectionLimit: DB_POOLSIZE,
        charset:'utf8mb4',
        queueLimit: 0
      });

      this.registerThreadCounter()
  }
  registerThreadCounter() {
    this.internalPool.on('connection', (connection) => console.log(`New connection established with server on thread #${connection.threadId}`))
  }
  get pool() {
    return this.internalPool
  }

}

module.exports = new MySQLConnector();