const router = require('koa-router')()
let myDB = require('../../../mysql/mysql')

router.get('/', async (ctx) => {
  let msg =await myDB.findMsg()
  await ctx.render('admin/dfbak/msg', { data: msg })
})

router.get('/add', async (ctx) => {
  await ctx.render('admin/user/add')
})

router.get('/edit', async (ctx) => {

  await ctx.render('admin/user/del')
})

router.get('/del', async (ctx) => {
  await ctx.render('admin/user/edit')
})



module.exports = router