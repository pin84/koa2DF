const router = require('koa-router')()

router.get('/', async (ctx) => {
  ctx.body = '后台管理新闻列表首页'
})

router.get('/add', async (ctx) => {
  ctx.body = '后台新闻管理 增加'
})

router.get('/edit', async (ctx) => {
  ctx.body = '后台新闻管理 编辑新闻'
})

router.get('/del', async (ctx) => {
  ctx.body = '后台新闻管理 删除新闻'
})



module.exports = router