// you can pass the parameter in the command line. e.g. node static_server.js 3000
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mimeType =require('./mimeType')
const MagicFilter =require('./filter/')
class BodyJsonParser{
  constructor(options){
    this.options = options
    this.root = options.root
  }
  middleware(){
    return this.pipe.bind(this)
  }
  async pipe(req, res) {
    return new Promise((resolve, reject) =>{
      if (req.headers['content-type'] != "application/json"){
        resolve("")
        return ""
      }
      var options = this.options
      var body = [];
      var request = req 
      var response = res 
      request.on("data", chunk => {
        body.push(chunk);
      });
      request
        .on("end", () => {
          body = body.concat().toString();
          request.json = JSON.parse(body)
          resolve(body)
          //'end' event is raised once per request,
        })
        .on("error", () => {
          response.statusCode = 400;
          response.end();
          reject(400)
        });
      response.on("error", err => {
        console.err(err);
        reject(err)
      });
    })
  }
}
exports = module.exports = BodyJsonParser