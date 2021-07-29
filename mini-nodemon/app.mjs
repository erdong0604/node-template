import Koa from 'koa'

const app = new Koa();


app.use(async ctx => {
  ctx.body = 'Hello World';
});
app.listen('3001',() => {
  console.log('启动了');
})