var expross = require('../lib');
var app = expross();
// app
app.use(function(req, res, next) {
    console.log('Time：', Date.now());
    next();
});
app.get('/', function(req, res, next) {
    res.send('first');
});
// router
var router = new expross.Router();
router.use(function(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.use('/', function(req, res, next) {
    res.send('second');
});
app.use('/user', router);
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});