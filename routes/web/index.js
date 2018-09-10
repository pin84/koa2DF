const router = require('koa-router')()
let myDB = require('../../mysql/mysql')

/**
 * 前台和后台路由的写法不一样， about 前面不用加 /
 */
 router.get('/', async (ctx) => {
 	await ctx.render('df/index')
 })

router.get('getPageNum', async (ctx) => {
	console.log('index ============ 12 ============ getpagenum')
  ctx.body = await myDB.getPageNum()
})

router.post('getBooks', async (ctx) => {
	let start = ctx.request.body.start,
	end = ctx.request.body.end;
    console.log('router web index.js =====20',ctx.request.body,start,end)
  ctx.body = await myDB.getBooks(start,end)
})

router.post('searchBook', async (ctx) => {
	let keyword = ctx.request.body.keyword
	ctx.body = await myDB.searchBooks(keyword)
})

router.post('favor', async (ctx) => {
	let username = ctx.request.body.name,
	phone = ctx.request.body.phone,
	books = ctx.request.body.books
	console.log('======router index favor====',ctx.request.body)

	ctx.body = await myDB.favor(username,phone,books)
})


//seller 手机app的接口
let appData = require('../../public/data/appData.json')
let seller = appData.seller;
let goods = appData.goods;
let ratings = appData.ratings;

router.get('seller',async (ctx) => {
  ctx.body = {
    errno: 0,
    seller: seller
  }
})
router.get('goods',async (ctx) => {
  ctx.body = {
    errno: 0,
    goods: goods
  }
})
router.get('ratings',async (ctx) => {
  ctx.body = {
    errno: 0,
    goods: ratings
  }
})
//seller 手机app的接口 =====END==========

module.exports = router
