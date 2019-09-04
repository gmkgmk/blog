const Koa = require('koa');
const KoaStatic = require('koa-static');
const path = require('path');
const cors = require('kcors');
const fs = require('fs');
const sourceMap = require('source-map');

const app = new Koa();
const viewPath = path.join(__filename, 'view');
const webPath = path.join(__dirname, '..', 'web');
app.use(cors());

app.use(KoaStatic(viewPath));

const sourcesPathMap = {};
const errList = [];
function fixPath(filePath) {
  return filePath.replace(/\.[\.\/]+/g, '');
}

const resolveSourceMap = async (mapFile, line, column) => {
  try {
    const file = await fs.readFileSync(mapFile),
      content = file.toString(),
      data = JSON.parse(content),
      sources = data.sources;

    sources.map(item => {
      sourcesPathMap[fixPath(item)] = item;
    });

    const consumer = await new sourceMap.SourceMapConsumer(content);

    const lookup = {
      line: parseInt(line),
      column: parseInt(column)
    };
    const result = consumer.originalPositionFor(lookup);

    var originSource = sourcesPathMap[result.source],
      sourcesContent = data.sourcesContent[sources.indexOf(originSource)];

    result.sourcesContent = sourcesContent;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const ServerSourceMap = async (ctx, next) => {
  const pathUrl = ctx.request.path;
  if (pathUrl === '/report') {
    const { row, col, msg } = ctx.query;
    const filename = path.basename(ctx.query.url);
    errList.push({
      msg,
      filename: path.join(webPath, filename + '.map'),
      row,
      col
    });
  }
  await next();
};
app.use(ServerSourceMap);

const errListRequest = async (ctx, next) => {
  const pathUrl = ctx.request.path;

  if (pathUrl === '/errlist') {
    try {
      const list = await Promise.all(
        errList.map(el => resolveSourceMap(el.filename, el.row, el.col))
      );

      ctx.body = {
        errList: list
      };
    } catch (error) {
      console.log('error: ', error);

      ctx.body = {
        error: error
      };
    }
  }
  await next();
};
app.use(errListRequest);

app.listen(8888, () => {
  console.log('app is listening port 8888');
});
