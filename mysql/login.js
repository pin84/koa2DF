const myDB = require('./mysql')

class Login {
  static getInstance() {
    if (!Login.instance) {
      Login.instance = new Login()
    }
    return Login.instance
  }
  constructor() {
  }

  find() {
    let sql = `select * from admin_table`
    return new Promise((resolve, reject) => {
      myDB.connect(sql).then((data) => {
        resolve(data)
      })
    })
  }
}
module.exports = Login.getInstance()

