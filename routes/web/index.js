const router = require('koa-router')()
let myDB = require('../../mysql/mysql')

/**
 * 前台和后台路由的写法不一样， about 前面不用加 /
 */
//  router.get('/', async (ctx) => {
//  	await ctx.render('df/index')
//  })

router.get('getPageNum', async (ctx) => {
	console.log('index ============ 12 ============ getpagenum')
  ctx.body = await myDB.getPageNum()
})

router.post('findAllBooks', async (ctx)=>{

	// let start = ctx.request.body.start
	// end = ctx
	console.log('router.index -==========')
	// ctx.body = await  myDB.getBooks()
	ctx.body = 'afsdfsfsdfs'
})

router.post('searchBook', async (ctx) => {
	let keyword = ctx.request.body.keyword
	ctx.body = await myDB.searchBooks(keyword)
})

router.post('favor', async (ctx) => {
	let username = ctx.request.body.name,
	phone = ctx.request.body.phone,
	books = ctx.request.body.books

	ctx.body = await myDB.favor(username,phone,books)

})





module.exports = router