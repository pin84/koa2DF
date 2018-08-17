let router = require('koa-router')()
let myDB = require('../../../mysql/mysql')



router.get('/', async (ctx) => {
  let books =await  myDB.findBooks()
  await ctx.render('admin/dfbak/upNewBook',{books})

})







module.exports = router