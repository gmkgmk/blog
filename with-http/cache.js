const Koa = require('koa2');
const koaStatic = require('koa-static');
const path = require('path');
const fs = require('fs');
const app = new Koa();
const port = 3000;
const PassThrough = require('stream').PassThrough;
const server = async (ctx, next) => {
  console.log('etag', ctx.get('If-None-Match'));
  // const filePath = './' + ctx.url;
  // const resStream = fs.createReadStream(filePath);
  // ctx.status = 200;
  console.log('if-modified', ctx.get('If-Modified-Since'));
  ctx.body = 'ok';
  await next();
  ctx.set('Cache-Control', 'no-cache');
  ctx.set('Etag', '123');
};
app.use(server);
// app.use(koaStatic(path.join(__dirname, '/')));

app.on('error', err => {
  console.log('server error', err);
});
app.listen(port, () => {
  console.log(`App is listening port ${port}`);
});
