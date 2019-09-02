const Koa = require("koa");
const Redis = require("ioredis");
const router = require("koa-router")();
const app = new Koa();
const log = console.log;
const redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    prefix: "guomk:", //存诸前缀
    ttl: 5, //过期时间
    family: 4,
    db: 0
});

const account = {
    username: "jackJones",
    password: 909010
};
let count = 0;
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
    ctx.body = result;
});

app.use(router.routes());
app.listen(1030, () => {
    log("app is listening at 1030");
});
