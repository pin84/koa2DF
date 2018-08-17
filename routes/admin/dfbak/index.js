const router = require('koa-router')()
const banner = require('./banner')
const msg = require('./msg')
const upNewBook = require('./upNewBook')

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
router.use('/msg',msg.routes())
router.use('/upNewBook',upNewBook.routes())



module.exports = router