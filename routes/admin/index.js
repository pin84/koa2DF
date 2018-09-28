const router = require('koa-router')()
const login = require('./login')
const user = require('./user')
const banner = require('./banner')
const news = require('./news')
const dfbak = require('./dfbak')


router.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') return;
  if (!ctx.session.userinfo && ctx.url !== '/admin/login') {
    await ctx.redirect('/admin/login')
  } else {
    await next()
  }
})

router.get('/', async (ctx) => {
  await ctx.render('admin/index')
})

//配置admin的子路由
router.use('/login', login.routes())
router.use('/user', user.routes())
router.use('/banner', banner.routes())
router.use('/news', news.routes())
router.use('/dfbak', dfbak.routes())



module.exports = router
