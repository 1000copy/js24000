const nunjucks = require('nunjucks');
function templating(path, opts) {
	nunjucks.configure(path || 'views', opts || { autoescape: true });
    return async (ctx, next) => {
        ctx.render = function (view, model) {
            ctx.response.body = nunjucks.render(view, model ||{});
            ctx.response.type = 'text/html';
        };
        await next();
    };
}
module.exports = templating;
