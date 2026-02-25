const http = require('http');

let products = [
    { name: "Florero de Barro", price: 120 },
    { name: "Sombrero de Chapa", price: 350 }
];

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'GET' && req.url === '/api/products') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    } else if (req.method === 'POST' && req.url === '/api/products') {
        let body = '';
        req.on('data', c => body += c);
        req.on('end', () => {
            products.unshift(JSON.parse(body));
            res.writeHead(201);
            res.end();
        });
    }
});

server.listen(3000);
