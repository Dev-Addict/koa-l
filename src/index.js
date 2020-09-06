const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");

const Data = require("./Data");

const data = [];

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router
  .get("/", (ctx) => {
    ctx.body = {
      status: "success",
      data,
    };
  })
  .post("/", (ctx) => {
    const { title, description } = ctx.request.body;

    if (!title) ctx.throw(400, "title is required.");

    if (!description) ctx.throw(400, "description is required.");

    data.push(new Data(title, description));

    ctx.body = {
      status: "success",
      data: data[data.length - 1],
    };
  });

app.use(async (ctx, next) => {
  ctx.accepts("application/json");
  ctx.acceptsCharsets("utf-8");
  ctx.response.type = "application/json";
  await next();
});

app.use(async (ctx, next) => {
  const startTime = Date.now();
  await next();
  const delta = Date.now() - startTime;

  console.log(`${ctx.response.status} ${ctx.method} ${ctx.url} - ${delta}ms`);
});

app.use(router.routes()).use(router.allowedMethods());

app.on("error", (err, ctx) => {
  console.error(err);
});

app.listen(3000);
