const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const Router = require('koa-router');
const router = new Router();

const app = new Koa();
// 添加处理模板的中间件
app.use(views(path.join(__dirname, 'views'), {
  map: {hbs: 'handlebars'}
}))


router.get('/', async (ctx, next) => {
  await ctx.render('index.hbs', {content: 'erdong'}); // 也可以使用 ctx.state 的数据
})
app.use(router.routes());
app.use(router.allowedMethods())
app.listen('3000',() => {
  console.log('启动了');
})