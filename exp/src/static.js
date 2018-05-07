// you can pass the parameter in the command line. e.g. node static_server.js 3000
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mimeType =require('./mimeType')
function static(options){
  // console.log('static')
  this.options = options
  var root = options.root
  
  return function static(req, res) {
    var public = req.basePath
    // console.log(`${req.method} ${req.url}`);
    // parse URL
    const parsedUrl = url.parse(req.url);
    parsedUrl.pathname = parsedUrl.pathname.slice(public.length)
    // extract URL path
    let pathname = `${root}${parsedUrl.pathname}`;
    // console.log('bac:',pathname)
    fs.exists(pathname, function (exist) {
      if(!exist) {
        // if the file is not found, return 404
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
        return;
      }
      // if is a directory, then look for index.html
      if (fs.statSync(pathname).isDirectory()) {
        pathname += '/index.html';
      }
      // read file from file system
      fs.readFile(pathname, function(err, data){
        if(err){
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          // based on the URL path, extract the file extention. e.g. .js, .doc, ...
          const ext = path.parse(pathname).ext.slice(1);
          // if the file is found, set Content-type and send data
          // console.log(mimeType,ext)
          res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
          res.end(data);
        }
      });
    });
  }
}
exports = module.exports = static
// var port = 3000
// http.createServer(static({port:port,root:"./src"})).listen(parseInt(port));
// console.log(`Server listening on port ${port}`);