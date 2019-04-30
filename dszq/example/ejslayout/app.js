var express =require('express')
var engine = require('ejs-mate')
var ejs = require('ejs')
app = express();
app.engine('ejs', engine);
app.set('views',__dirname);
app.set('view engine', 'ejs'); 
// so you can render('index') ,else you must assign extension ('index.ejs')
app.get('/',function(req,res,next){
	console.log(ejs.render('<%=who%>',{who:"reco"}))
	res.render('index',{ what:'best', who:'me'});
});
app.listen(3000);

