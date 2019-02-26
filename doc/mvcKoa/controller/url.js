var fn_index = async (ctx, next) => {
    // ctx.response.body = `<h1>Index</h1>`;
    ctx.render('index.html', { name: 'Reco' });
	// console.log(s);
};
var fn_url1 = async (ctx, next) => {
    ctx.response.body = `<h1>URL1</h1>`;
};
var fn_url2 = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `Hello, ${name}!`;
};
module.exports = {
    'GET /': fn_index,
    'GET /url1': fn_url1,
    'GET /url2/:name':fn_url2
};