var express = require('express');
var app = express()
var passport = require('passport')

var LocalStrategy = require('passport-local')
var user = {username:"admin",password:"admin123"}

// app.use(passport.session());
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'pwd'},
    function(username, password, done) {
        console.log('authenticating,',username,password)
        if(username == 'admin' && password == 'admin123'){
            done(null,user)
        }else{
            done(new Error('User name or password is wrong'))
        }
    }
));
passport.serializeUser(function(user, done) {
    console.log("serializeUser,",user)
  done(null, user.username);
});
 
passport.deserializeUser(function(username, done) {
  console.log("deserializeUser,",username)
  done(null,user)
});

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
app.use(passport.initialize());
app.use(passport.session());
app.get('/login', function(req, res){
    res.sendFile(__dirname + '/login.html')
});
app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {res.redirect('/');})
app.get('/', function (req, res) {
    if(req.user)
        res.render('home',{username : req.user.username});
    else
        res.redirect('/login')
})
app.get('/logout', function (req, res) {
    // req.session.passport = null; // 删除session
    req.logout()
    res.redirect('login');
});
app.listen(3000,function () {
    console.log('http://127.0.0.1:3000')
})
