const Koa = require('koa')
const app = new Koa()
const initManager = require('./core/init')
const parser = require('koa-bodyparser')
const catchError = require('./middlewares/exceptions')
const cors = require('koa2-cors');

app.use(parser())
app.use(catchError)
app.use(
  cors({
      origin: function(ctx) {
          // return '*'; // 允许来自所有域名请求
          return 'http://couy.xyz'; //只允许http://localhost:8080这个域名的请求
      },
  })
);

initManager.initCore(app)
app.listen(3001)