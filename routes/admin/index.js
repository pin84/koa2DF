const router = require('koa-router')()
const user = require('./user')
const banner = require('./banner')
const news = require('./news')



router.get('/', async (ctx) => {
  ctx.body = '后台管理首页'
})

//配置admin的子路由
router.use('/user',user.routes())
router.use('/banner',banner.routes())
router.use('/news',news.routes())



module.exports = router