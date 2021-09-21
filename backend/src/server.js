const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const startServer = () => {
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('uber eats');
  });
  server.port = port;
  server.hostname = hostname;
  server.listen(() => {
    console.log(`Node Server running at http://${hostname}:${port}/`);
  });
};

module.exports = startServer;
