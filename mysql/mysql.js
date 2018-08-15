let mysql = require('mysql')
const config = require('../config/config')

let pool = mysql.createPool({
  connectionLimit: 10,
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
})

class Db {
  static getInstance() { //单例模式
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }

  constructor() {

  }

  connect(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } {
              resolve(rows)
            }
            connection.release();
          })
        }
      })
    })
  }

  findUser(name) {
    let sql = `select * from admin_table where username='${name}'`
    return new Promise((resolve, reject) => {
      this.connect(sql).then((data) => {
        resolve(data)
      })
    })
  }

  
  updata() {

  }
  insert() {

  }
}

/*
let myDb = Db.getInstance()
let sql = `select * from custom_evaluation_table`
myDb.find(sql).then((data) => {
 console.log(data)
})
*/

module.exports = Db.getInstance()