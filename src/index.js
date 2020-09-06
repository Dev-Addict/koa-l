const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
  const startTime = Date.now();
  await next();
  const delta = Date.now() - startTime;

  console.log(`${ctx.response.status} ${ctx.method} ${ctx.url} - ${delta}ms`);
});

app.listen(3000);
