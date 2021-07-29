const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const cors = require('koa2-cors');
const router = new Router();
const path = require('path')
const KoaStatic  = require('koa-static')
const port = 8889;
const Config = require('./config');
const pageData = require('./pageData');
router.get('/getPageData', async (ctx, next) => {
  console.log(pageData);
  ctx.response.body = pageData;
});

app.use(KoaStatic(Config.comStaticPath))
app
.use(router.routes());
app.listen(Config.port,() => {
  console.log(`${Config.ipAddress}:${Config.port}`);
})