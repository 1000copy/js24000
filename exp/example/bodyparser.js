var http = require("http");
var server = http.createServer();
server.on("request", (request, response) => {
  var body = [];
  request.on("data", chunk => {
    body.push(chunk);
  });
  request
    .on("end", () => {
      body = body.concat().toString();
      console.log(body)
      //'end' event is raised once per request,
    })
    .on("error", () => {
      response.statusCode = 400;
      response.end();
    });
  response.on("error", err => {
    console.err(err);
  });
  response.write("Hello World!");
  response.end();
});
server.listen(8081)
// curl -X POST  -H "Content-Type: application/json" -d '{"subject":"s4"}' http://localhost:8081/