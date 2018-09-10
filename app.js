const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
//自己的中间件
const path = require('path')
const render = require('koa-art-template')
const router = require('koa-router')()
const koaBody = require('koa-body')
const cors = require('koa2-cors') //跨域


// const index = require('./routes/index')
// const users = require('./routes/users')

const admin = require('./routes/admin')
const api = require('./routes/admin/api')
const web = require('./routes/web')

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())
app.use(cors())
// app.use(require('koa-static')(__dirname + '/public'))
//为项目单独配置的静态文件路径
app.use(require('koa-static')(__dirname + '/views/df/'))

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

//koa-body
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024 // 设置上传文件大小最大限制，默认2M
  }
}))


//test tag v1.1

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
router.use('/admin',admin.routes())
// router.use('/api',api.routes())
router.use('/',web.routes())


// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())


app
  .use(router.routes())
  .use(router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
