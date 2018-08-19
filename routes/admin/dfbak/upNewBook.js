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
      break
    case 'del':
      let rows = await myDB.find('books_table', ctx.query.id)
      fs.unlink('views/df/uploads/' + rows[0].src)
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
  let src = ctx.req.file.filename,
    title = ctx.req.body.title,
    auth = ctx.req.body.auth,
    printer = ctx.req.body.printer

  myDB.updataNewBooks(title, auth, src, printer)
  let books = await myDB.findBooks()

  await ctx.redirect('upNewBook', { books })
})





module.exports = router
