let mysql = require('mysql')
const config = require('../config/config')

let pool = mysql.createPool({
  connectionLimit: 100,
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

  getPageNum() {
    let sql = `select count(ID) as count from books_table`
    return this.connect(sql)
  }


  getBooks(start,end) {
    console.log('============getbooks    mysql=======')
    let sql = `select * from books_table limit ${start}, ${end}`
    // let sql = `select * from books_table limit 0,3`
    let result = this.connect(sql)
    return result
  }

  searchBooks(keyword) {
    let sql = `select * from books_table where title like '%${keyword}%' or auth like '%${keyword}%' or printer like '%${keyword}%'`
    return this.connect(sql)
  }

  favor(name, phone, books) {
    let sql = `insert into favor (name,phone,bookinfo) values ('${name}','${phone}','${books}')`
    return this.connect(sql)
  }

  getBanners() {
    let sql = `select * from banner_table `
    return this.connect(sql)
  }

  findBannerFromID(id) {
    let sql = `select * from banner_table where id='${id}'`
    return this.connect(sql)
  }

  updataBanner(id, title, href, description) {
    let sql = `update banner_table set title='${title}',href='${href}',description='${description}' where ID='${id}'`
    return this.connect(sql)
  }

  insertBanner(title, description, href) {
    let sql = `insert into banner_table (title,description,href) values ('${title}','${description}','${href}')`
    return this.connect(sql)
  }

  deleteBanner(id) {
    let sql = `delete from banner_table where id='${id}'`
    return this.connect(sql)
  }

  //msg
  findMsg() {
    let sql = `select * from favor`
    return this.connect(sql)
  }

  //upNewBook
  findBooks() {
    let sql = `select * from books_table`
    return this.connect(sql)
  }

  insertNewBooks(title, auth, src, printer) {
    let sql = `insert into books_table (title,auth,src,printer) values ('${title}','${auth}','${src}','${printer}')`
    return this.connect(sql)
  }

  updataBookHaveAvartor(title, auth, printer, filename, id) {
    let sql = `update books_table set title='${title}',auth='${auth}',printer='${printer}',src='${filename}' where ID='${id}'`
    return this.connect(sql)
  }
  updataBookNoAvartor(title, auth, printer, id) {
    let sql = `update books_table set title='${title}',auth='${auth}',printer='${printer}' where ID='${id}'`
    return this.connect(sql)
  }


  find(table, id) {
    let sql = `select * from ${table} where id='${id}'`
    return this.connect(sql)
  }
  delete(table, id) {
    let sql = `delete from ${table} where id='${id}'`
    return this.connect(sql)
  }
  updata() {

  }
  insert() {

  }


}



module.exports = Db.getInstance()
