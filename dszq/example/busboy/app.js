var http = require('http'),
    inspect = require('util').inspect;
 
var Busboy = require('busboy');
 
http.createServer(function(req, res) {
  if (req.method === 'POST') {
    var busboy = new Busboy({ headers: req.headers });
    var result = {}
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      function tracePrototypeChainOf(object) {
          var proto = object.constructor.prototype;
          var result = '';
          while (proto) {
              result += ' -> ' + proto.constructor.name;
              proto = Object.getPrototypeOf(proto)
          }
          return result;
      }
      // 1. 如何判断对象是一个流？
      function isReadableStream(obj) {
        return typeof obj  === 'object' &&
          typeof obj._read === 'function' &&
          typeof obj._readableState === 'object';
      }
      // console.log(isReadableStream(fs.createReadStream('car.jpg')));
      console.log(file.constructor,Object.getPrototypeOf(file.constructor.prototype).constructor.name)
      var Stream = require('stream').Stream
      console.log(Stream)
      var EventEmitter = require('events')
      console.log('instanceof:',
        file instanceof Stream,
        file instanceof EventEmitter,
        file instanceof Object,
        EventEmitter instanceof Object,
        req instanceof Stream
        )
      console.log(tracePrototypeChainOf(file))
      console.log(tracePrototypeChainOf(req))
      console.log(isReadableStream(file));
      // console.log(file);
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      result[fieldname] = val
    });
    busboy.on('finish', function() {
      console.log('Done parsing form!',result);
      res.writeHead(303, { Connection: 'close', Location: '/' });
      res.end('folks');
    });
    // 原来req本来就是一个stream 
    // req instanceof Stream // true
    req.pipe(busboy);
  } else if (req.method === 'GET') {
    res.writeHead(200, { Connection: 'close' });
    res.end('<html><head></head><body>\
               <form method="POST" enctype="multipart/form-data">\
                <input type="text" name="textfield"><br />\
                <input type="file" name="filefield"><br />\
                <input type="submit">\
              </form>\
            </body></html>');
  }
}).listen(3000, function() {
  console.log('Listening for requests');
});
