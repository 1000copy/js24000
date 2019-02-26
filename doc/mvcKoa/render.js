const nunjucks = require('nunjucks');
nunjucks.configure('views', { autoescape: true });
var s = nunjucks.render('index.html', { name: 'Reco' });
console.log(s);