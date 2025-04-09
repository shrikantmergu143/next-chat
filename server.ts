const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const WS = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const wss = new WS.Server({ noServer: true });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      ws.send(`Hello, you sent -> ${message}`);
    });
    ws.on('close', () => {
    });
  });

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
  });
});
