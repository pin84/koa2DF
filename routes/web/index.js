const router = require('koa-router')()

/**
 * 前台和后台路由的写法不一样， about 前面不用加 /
 */
router.get('/', async (ctx) => {
  await ctx.render('df/index')
})

router.get('getPageNum', async (ctx) => {
  await ctx.render('web/about')
})

router.get('news', async (ctx) => {
  await ctx.render('web/news')
})



module.exports = router