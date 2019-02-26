const fs = require('fs');
class MiddleController{
    constructor(dir){
        let defaut = 'controller'
        let
            controllers_dir = dir || defaut,
            router = require('koa-router')();
        this.router = router
        this.controllers_dir = '../'+controllers_dir
    }
    mapFile(file) {
        let mapping = require(file);
        for (var url in mapping) {
            var fn = mapping[url]
            this.dispatch(url,fn)
        }
    }
    doGet(url,fn){
        var path = url.substring(4);
        this.router.get(path, fn);
        console.log(`register URL mapping: GET ${path}`);
    }
    doPost(url,fn){
        var path = url.substring(5);
        this.router.post(path, fn);
        console.log(`register URL mapping: POST ${path}`);   
    }
    dispatch(url,fn){
        if (url.startsWith('GET ')) {
            this.doGet(url,fn)
        } else if (url.startsWith('POST ')) {
            this.doPost(url,fn)
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
    run(){
        return this.mapFiles()
    }
    mapFiles() {
        for (var f of this.getFiles()) {
            console.log(`process controller: ${f}...`);
            
            this.mapFile(this.getDir() +'/' + f);
        }
        return this.router.routes()
    }
    getDir(){
        return __dirname + '/' + this.controllers_dir
    }
    getFiles(){
        var dir = this.getDir()
        var files = fs.readdirSync(dir);
        var js_files = files.filter((f) => {
            return f.endsWith('.js');
        });
        return js_files
    }
}
module.exports = function (dir) {
        var a = new MiddleController(dir)
	    return a.run();
};