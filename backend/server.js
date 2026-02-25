const http = require('http');

let db = [
    { name: "Máscara de Güegüense", price: 85 },
    { name: "Cajeta de Zapoyol", price: 20 }
];

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'GET' && req.url === '/api/products') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(db));
    } else if (req.method === 'POST' && req.url === '/api/products') {
        let body = '';
        req.on('data', c => body += c);
        req.on('end', () => {
            db.unshift(JSON.parse(body));
            res.writeHead(201);
            res.end();
        });
    }
});

server.listen(3000);
