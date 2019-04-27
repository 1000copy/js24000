
var express = require('express');
var app = express();
var session= require('express-session');
var bodyparser = require('body-parser');    
app.set('views', __dirname);
app.set('view engine', 'html');
app.engine('html', require('ejs').__express); 
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({ extended: true }));
app.use(session({
    secret :  'secret', 
    resave : true,
    saveUninitialized: false, 
    cookie : {
        maxAge : 1000 * 60 * 3,
    },
}));
app.get('/login', function(req, res){
    res.sendFile(__dirname + '/login.html')
});
app.post('/login', function(req, res){
    if(req.body.username == 'admin' && req.body.pwd == 'admin123'){
        req.session.userName = req.body.username;
        res.redirect('/');
    }
    else{
        res.json({ret_code : 1, ret_msg : 'User name or password is wrong'});
    }
});    
app.get('/', function (req, res) {
    if(req.session.userName){
        res.render('home',{username : req.session.userName});
    }else{
        res.redirect('/login');
    }
})
app.get('/logout', function (req, res) {
    req.session.userName = null; // 删除session
    res.redirect('login');
});
app.listen(3000,function () {
    console.log('http://127.0.0.1:3000')
})
