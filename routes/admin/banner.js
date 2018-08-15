const router = require('koa-router')()

router.get('/', async (ctx) => {
  ctx.body = '后台管理轮播图列表首页'
})

router.get('/add', async (ctx) => {
  ctx.body = '后台轮播图管理 增加'
})

router.get('/edit', async (ctx) => {
  ctx.body = '后台轮播图管理 编辑轮播图'
})

router.get('/del', async (ctx) => {
  ctx.body = '后台轮播图管理 删除轮播图'
})



module.exports = router