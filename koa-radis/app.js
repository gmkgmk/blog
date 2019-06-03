const Koa = require("koa");
const Redis = require("ioredis");
const router = require("koa-router")();
const app = new Koa();
const log = console.log;
const redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    prefix: "guomk", //存诸前缀
    family: 4, //IP堆栈的版本。默认为4。
    db: 0, //要使用的数据库索引。
    showFriendlyErrorStack: true //优化错误堆栈
});
const pub = new Redis();
const sub = new Redis();

const account = {
    username: "jackJones",
    password: 909010
};
let count = 0;

sub.subscribe("news", "music", function(err, count) {

    pub.publish("news", "Hello world!");
    pub.publish("music", "Hello again!");
});

sub.on("message", function(channel, message) {
    // Receive message Hello world! from channel news
    // Receive message Hello again! from channel music
    console.log("Receive message %s from channel %s", message, channel);
});

// There's also an event called 'messageBuffer', which is the same as 'message' except
// it returns buffers instead of strings.
sub.on("messageBuffer", function(channel, message) {
    // Both `channel` and `message` are buffers.
});

router.get("/set", async (ctx, next) => {
    const set = {
        count,
        ...account
    };
    count = count + 1;

    redis.set("sessionId", JSON.stringify(set));

    ctx.body = "设置成功";
});

router.get("/get", async (ctx, next) => {
    const result = await redis.get("sessionId");
    ctx.body = result || {};
});
redis.monitor(function (err, monitor) {
    monitor.on('monitor', function (time, args, source, database) {
        console.log(time, args, source, database)
    });
  });
app.use(router.routes());
app.listen(1030, () => {
    log("app is listening at 1030");
});
