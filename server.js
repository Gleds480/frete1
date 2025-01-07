const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0'; // Permite acessar pelo IP
const port = 8080;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    if (extname === '.js') {
        contentType = 'application/javascript';
    } else if (extname === '.css') {
        contentType = 'text/css';
    } else if (extname === '.png') {
        contentType = 'image/png';
    } else if (extname === '.jpg' || extname === '.jpeg') {
        contentType = 'image/jpeg';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});