const router = require('koa-router')()
const banner = require('./banner')

router.get('/', async (ctx) => {
  await ctx.render('admin/dfbak/index')
})
/*


router.get('/msg', async (ctx) => {

  await ctx.render('admin/dfbak/msg')
})

router.get('/custom', async (ctx) => {
  await ctx.render('admin/dfbak/custom')
})

*/

//配置admin的子路由
router.use('/banner',banner.routes())



module.exports = router