const router = require('koa-router')()
let myDB = require('../../../mysql/mysql')

router.get('/', async (ctx) => {
  switch (ctx.query.act) {
    case 'mod':
      console.log('mod')
      break
    case 'del':
      
      console.log('del')

      await myDB.deledtBanner(id)

      break
    default:
      let banners = await myDB.getBanners()
      await ctx.render('admin/dfbak/banner', { banners })
      break
  }
})

router.post('/', async (ctx) => {
  let title = ctx.request.body.title,
    href = ctx.request.body.href,
    description = ctx.request.body.description

  if (!title || !href || !description) {
    ctx.body = '请输入完整的信息'
    return
  }




  await myDB.insertBanner(title, description, href)
  await ctx.redirect('banner')
})

// router.get('/edit', async (ctx) => {

//   await ctx.render('admin/user/del')
// })

// router.get('/del', async (ctx) => {
//   await ctx.render('admin/user/edit')
// })



module.exports = router