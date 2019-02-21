// you can pass the parameter in the command line. e.g. node static_server.js 3000
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mimeType =require('../mimeType')
// const MagicFilter =require('./filter/')
class StaticServer{
  constructor(options){
    this.options = options
    this.root = options.root
    this.filters = []
    // this.addFilter(new MagicFilter())
  }
  addFilter(filter){
    this.filters.push(filter)
  }
  middleware(){
    return this.pipe.bind(this)
  }
  pipe(req, res) {
    var options = this.options
    var basePath = req.basePath
    var filters = this.filters
    const parsedUrl = url.parse(req.url)
    parsedUrl.pathname = parsedUrl.pathname.slice((basePath==undefined?"":basePath).length)
    let pathname = `${this.root}${parsedUrl.pathname}`
    fs.exists(pathname, function (exist) {
      if(!exist) {
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
        return;
      }
      if (fs.statSync(pathname).isDirectory()) {
        pathname += '/index.html';
      }
      fs.readFile(pathname, function(err, data){
        if(err){
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          const ext = path.parse(pathname).ext.slice(1);
          for (var i = 0; i < filters.length; i++) {
            var filter = filters[i]
            if (ext == filter.ext){
              if (filter.pipe(req,res,ext))
                return
            }
          }
          res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
          res.end(data);
        }
      });
    });
  }
}
exports = module.exports = StaticServer