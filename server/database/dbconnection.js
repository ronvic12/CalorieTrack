var mysql = require('mysql2');
require('dotenv').config();

class MySQLConnector{

  get DB_USERNAME () { return process.env.DB_USERNAME } 
  get DB_NAME () {return process.env.DB_NAME}
  get DB_PASSWORD () {return process.env.DB_PASSWORD}
  get DB_ADDRESS () {return process.env.DB_HOST}
  get DB_POOLSIZE () {return process.env.DB_POOLSIZE || 100 }
  constructor(){

    this.internalPool = mysql.createPool({
        host: this.DB_ADDRESS,
        user: this.DB_USERNAME,
        password: this.DB_PASSWORD,
        database: this.DB_NAME,
        waitForConnections: true,
        connectionLimit: this.DB_POOLSIZE,
        charset:'utf8mb4',
        queueLimit:process.env.DB_QUEUELIMIT || 250
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