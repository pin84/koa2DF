let router = require('koa-router')()
let multer = require('koa-multer')
let fs = require('fs')
let myDB = require('../../../mysql/mysql')


//配置
let storage = multer.diskStorage({
  //文件保存路径
  destination: (req, rile, cb) => {
    cb(null, './views/df/uploads')
  },

  //修改文件名
  filename: (req, file, cb) => {
    let fileFormat = (file.originalname).split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

let upload = multer({ storage: storage })


router.get('/', async (ctx) => {

  switch (ctx.query.act) {
    case 'mod':
      let modrows = await myDB.find('books_table', ctx.query.id)
      let modbooks = await myDB.findBooks()
      await ctx.render('admin/dfbak/upNewbook', { books: modbooks, mod_data: modrows[0] })
      break
    case 'del':
      let delrows = await myDB.find('books_table', ctx.query.id)
      fs.unlink('views/df/uploads/' + delrows[0].src)
      myDB.delete('books_table', ctx.query.id)
      await await ctx.redirect('upNewBook')
      break
    default:
      let books = await myDB.findBooks()
      await ctx.render('admin/dfbak/upNewBook', { books })
      break
  }

})

router.post('/', upload.single('file'), async (ctx) => {

  let title = ctx.req.body.title,
    auth = ctx.req.body.auth,
    printer = ctx.req.body.printer

  if (ctx.req.body.mod_id) {
    myDB.

    console.log('ssss工aaaaaass')


    return
  }
  let src = ctx.req.file.filename
  myDB.updataNewBooks(title, auth, src, printer)
  let books = await myDB.findBooks()

  await ctx.redirect('upNewBook', { books })
})





module.exports = router
