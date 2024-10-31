// Create web server
// 1. Create a web server
// 2. Add a request listener
// 3. Parse incoming request
// 4. Send response
// 5. Listen on port 3000
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const comments = require('./comments');
const PORT = 3000;

// 1. Create a web server
const server = http.createServer((req, res) => {
  // 3. Parse incoming request
  const { pathname } = url.parse(req.url);
  console.log('Request:', pathname);
  if (pathname === '/comments' && req.method === 'GET') {
    // 4. Send response
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(comments));
  } else if (pathname === '/comments' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const newComment = JSON.parse(body);
      comments.push(newComment);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newComment));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// 5. Listen on port 3000
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});