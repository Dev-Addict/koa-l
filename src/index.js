const Koa = require("koa");
var Router = require("koa-router");

const app = new Koa();
const router = new Router();

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
