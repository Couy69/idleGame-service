const Koa = require('koa')
const app = new Koa()
const initManager = require('./core/init')
const parser = require('koa-bodyparser')
const catchError = require('./middlewares/exceptions')


app.use(parser())
app.use(catchError)

initManager.initCore(app)
app.listen(3001)