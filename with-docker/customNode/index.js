var http = require('http');

http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end("Hello, Universe! I'm running on 8888");
  })
  .listen(8888);
console.log('Server running at http://127.0.0.1:8888/');
