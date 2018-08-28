const router = require('koa-router')()
let myDB = require('../../../mysql/mysql')

router.get('/', async (ctx) => {
  switch (ctx.query.act) {
    case 'mod':
      let banners = await myDB.getBanners()
      let findBanner = await myDB.findBannerFromID(ctx.query.id)
      await ctx.render('admin/dfbak/banner', { banners, mod_data: findBanner })
      break
    case 'del':
      await myDB.deleteBanner(ctx.query.id)
      await ctx.redirect('banner')
      break
    default:
      console.log('default');
      
      let bannersa = await myDB.getBanners()
      await ctx.render('admin/dfbak/banner', { banners:bannersa })
      break
  }
})



router.post('/', async (ctx) => {

  let title = ctx.request.body.title,
    href = ctx.request.body.href,
    description = ctx.request.body.description

    console.log('banner-post',title,href,description);
    
  if (!title || !href || !description) {
    ctx.body = '请输入完整的信息'
    return
  }

  if (ctx.request.body.mod_id) {
    console.log('banner have id')
    let id = ctx.request.body.mod_id

    await myDB.updataBanner(id, title, href, description)
    await ctx.redirect('banner')
    return
  }

  console.log('===========conaaaaaaaaaaa')
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
