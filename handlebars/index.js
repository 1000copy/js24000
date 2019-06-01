const app = require('express')()
const path = require('path')
app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')
// app.set('view engine', 'html');
// 	app.engine('html', require('ejs').__express); 
app.get('/',(req,res)=>{
	res.render('index.hbs',{title:"hello",list:[1,2,3]});
})
app.listen(5000);
