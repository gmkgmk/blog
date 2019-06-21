const Koa = require('koa2');
const koaStatic = require('koa-static');
const path = require('path');
const fs = require('fs');
const app = new Koa();
const port = 3000;
const imgExt = new Array('png', 'jpg', 'jpeg', 'bmp', 'gif');
const writeReferer = 'http://localhost:3000/';
// 图片防盗链
const server = async (ctx, next) => {
  const ext = ctx.url && ctx.url.split('.').slice(-1)[0];
  const referer = ctx.request.headers.referer;
  if (imgExt.includes(ext) && referer !== writeReferer) {
    // var content = fs.readFileSync('./b.jpg', 'binary');
    // ctx.res.writeHead(200);
    // ctx.res.write(content, 'binary');
    // ctx.res.end();
    // return
    ctx.path = './b.jpg';
  }
  await next();
};
const html = ctx => {
  ctx.body = 'ok';
};

app.use(server);
app.use(koaStatic(path.join(__dirname, '/')));
app.use(html);
app.listen(port, () => {
  console.log(`App is listening port ${port}`);
});
