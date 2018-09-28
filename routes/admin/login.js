const router = require('koa-router')()
const myDB = require('../../mysql/login')

router.get('/', async (ctx) => {
  await ctx.render('admin/login')
})

router.post('/', async (ctx) => {
  let name = ctx.request.body.name,
    pwd = ctx.request.body.pwd

  if (name === '' || pwd === '') {
    ctx.body = '请输入用户名和密码'
    return
  }

  let data = await myDB.find()
  let objNames = {}
  data.forEach((item) => {
    objNames[item.username] = item.password
  })

  if (!objNames[name] || objNames[name] !== pwd) {
    ctx.body = '用户名或密码错误'
    return
  }

  ctx.session.userinfo = name + pwd
  await ctx.redirect('/admin')
})

// router.get('/edit', async (ctx) => {

//   await ctx.render('admin/user/del')
// })

// router.get('/del', async (ctx) => {
//   await ctx.render('admin/user/edit')
// })



module.exports = router
