const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const cors = require('koa2-cors');
const router = new Router();
const path = require('path')
const KoaStatic  = require('koa-static')
const useConfig = require('./app/middleware/useConfig');
const Config = require('./config');
const generateRoutes = require( './router')
const routerResponse = require('./app/middleware/routerResponse');
const pageData = require('./pageData');
// router.get('/getPageData', async (ctx, next) => {
//   console.log(pageData);
//   ctx.response.body = pageData;
// });

app.use(KoaStatic(Config.staticFilePath))
.use(useConfig())
.use(routerResponse())
generateRoutes(app);
app.listen(Config.port,() => {
  console.log(`${Config.ipAddress}:${Config.port}`);
})