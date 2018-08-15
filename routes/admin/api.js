const router = require('koa-router')()



router.get('/',async (ctx)=>{
  ctx.body ='这是api的首页'
})

router.get('/newslist',async (ctx)=>{
  ctx.body = {'title':'这是一个新闻接口'}
})

router.get('/banner',async (ctx)=>{
  ctx.body = {'title':'这是一个轮播图的api'}
})




module.exports = router