const router = require('koa-router')()
const user = require('./user')
const banner = require('./banner')
const news = require('./news')
const dfbak = require('./dfbak')



router.get('/', async (ctx) => {
  // await ctx.render('admin/dfbak/index')
  ctx.body = '后台管理首页'
})

//配置admin的子路由
router.use('/user',user.routes())
router.use('/banner',banner.routes())
router.use('/news',news.routes())
router.use('/dfbak',dfbak.routes())



module.exports = router