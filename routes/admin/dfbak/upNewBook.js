let router = require('koa-router')()
let fs = require('fs')
let myDB = require('../../../mysql/mysql')


router.get('/', async (ctx) => {
  switch (ctx.query.act) {
    case 'mod':
      // let modbooks =  myDB.findBooks()
      // let modrows =  myDB.find('books_table', ctx.query.id)

      let [modbooks,modrows] = await
      Promise.all([ myDB.findBooks(),myDB.find('books_table', ctx.query.id)])

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
    console.time('start')
      let books = await myDB.findBooks()
      await ctx.render('admin/dfbak/upNewBook', { books })
      console.timeEnd('start')
      break
  }


})

router.post('/', async (ctx) => {

  let title = ctx.request.body.title,
    auth = ctx.request.body.auth,
    printer = ctx.request.body.printer,
    file = ctx.request.files.file

  //提前获取文件的信息，如果没有则为null
  const ext = file.name.split('.').pop(); // 获取上传文件扩展名
  let filename = `${Date.now()}.${ext}`

  if (!ctx.request.body.mod_id) {
    if (!title || !auth || !printer || file.size === 0) {
      ctx.body = '请填写完整信息'
      return
    }
  }


  //修改
  if (ctx.request.body.mod_id) {
    let mod_id = ctx.request.body.mod_id
    if (file.size === 0) { //不修图像
      await myDB.updataBookNoAvartor(title, auth, printer, mod_id)
      await ctx.redirect('upNewBook')
    } else { //修改图像
      let oldFilename = await myDB.find('books_table', mod_id)
      fs.unlink('views/df/uploads/' + oldFilename[0].src, (err) => {
        if (err) {
          console.log(err);
        }
      })
      fileUp(file, filename)
      await myDB.updataBookHaveAvartor(title, auth, printer, filename, mod_id)
      await ctx.redirect('upNewBook')
    }
    return
  }

  fileUp(file, filename)
  await myDB.insertNewBooks(title, auth, filename, printer)
  await ctx.redirect('upNewBook')
})


function fileUp(file, filename) {
  //koaBody =======start===== (2)
  const reader = fs.createReadStream(file.path); // 创建可读流
  const upStream = fs.createWriteStream(`views/df/uploads/${filename}`); // 创建可写流
  reader.pipe(upStream); // 可读流通过管道写入可写流
  // ==========end========
}



module.exports = router
