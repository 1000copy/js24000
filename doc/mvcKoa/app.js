const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(bodyParser());
var controller = require('./middleware/controller.js')
var templating = require('./middleware/templating.js')
app.use(templating());
app.use(controller());
app.listen(3000);
console.log('app started at port 3000...');