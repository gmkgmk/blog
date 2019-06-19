const net = require('net');
class httpServer {
  constructor(url) {
    this.url = null;
    this.server = null;
    this.serverVersion = 'HTTP/1.1';
    this.line = '';
    this.headers = [];
    this.body = [];
    this.conn(url);
  }
  get() {
    this.setLine('GET');
    this.setHeader(['HOST', this.url['host']]);
    this.request();
  }
  post() {}

  conn(url) {
    this.url = new URL(new URL(url));
    // this.server = net.createConnection(this.url['origin'])
    this.server = net.Socket({ allowHalfOpen: true });
    this.server.connect({
      port: 80,
      host: this.url['origin']
    });
  }
  close() {}

  setLine(method) {
    this.line = `${method} ${this.url['pathname']} ${this.serverVersion}`;
  }
  setHeader(headerLine) {
    this.headers.push(headerLine);
  }
  setBody(bodyLine) {
    this.body.push(bodyLine);
  }
  request() {
    const header = this.headers
      .map(e => {
        e = e.join(':');
        return e;
      })
      .join('\n');
    const req = [this.line, header, '', this.body.join()].join('\n') + '\n';
    console.log('req: ', req);
    this.server.write(req, function(res) {
      console.log(res);
    });
  }
}

const url =
  'http://nodejs.cn/api/http.html#http_agent_reusesocket_socket_request';

const server = new httpServer(url);
server.get();
