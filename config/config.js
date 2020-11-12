const config = {
  port: 3001,
  database: {
    dbName: 'idleGame',
    username: 'root',
    password: 'root',
    port: '3306',
    host: 'localhost'
  },
  security:{
    secretKey:"couy",
    expiresIn:60*60
  }
}

module.exports = config