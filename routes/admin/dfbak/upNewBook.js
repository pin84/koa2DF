let router = require('koa-router')()
let fs = require('fs')
let myDB = require('../../../mysql/mysql')


router.get('/', async (ctx) => {
  switch (ctx.query.act) {
    case 'mod':
      let modrows = await myDB.find('books_table', ctx.query.id)
      let modbooks = await myDB.findBooks()
      await ctx.render('admin/dfbak/upNewbook', { books: modbooks, mod_data: modrows[0] })
      break
    case 'del':
      let delrows = await myDB.find('books_table', ctx.query.id)
      fs.unlink('views/df/uploads/' + delrows[0].src, (err) => {
        if (err) {
          console.log(err);
        }
      })
      await myDB.delete('books_table', ctx.query.id)
      await ctx.redirect('upNewBook')
      break
    default:
      let books = await myDB.findBooks()
      await ctx.render('admin/dfbak/upNewBook', { books })
      break
  }


})

router.post('/', async (ctx) => {

  let title = ctx.request.body.title,
    auth = ctx.request.body.auth,
    printer = ctx.request.body.printer
  //koaBody =======start=====(1)
  const file = ctx.request.files.file// 获取上传文件
  // ==========end========

  // console.log(ctx.request.files.file.size)

  if (!ctx.request.body.mod_id) {
    console.log('无ID')
    if (!title || !auth || !printer || file.size === 0) {
      ctx.body = '请填写完整信息'
      return
    }
  }

  if (ctx.request.body.mod_id) {
    console.log('有ID')
    if (file.size !== 0) {


    }

    return
  }

  //koaBody =======start===== (2)
  const reader = fs.createReadStream(file.path); // 创建可读流
  const ext = file.name.split('.').pop(); // 获取上传文件扩展名
  let filename = `${Date.now()}.${ext}`
  const upStream = fs.createWriteStream(`views/df/uploads/${filename}`); // 创建可写流
  reader.pipe(upStream); // 可读流通过管道写入可写流
  // ==========end========

  await myDB.insertNewBooks(title, auth, filename, printer)
  await ctx.redirect('upNewBook')

})


 async function insertData(ctx,file) {
 
}



module.exports = router
