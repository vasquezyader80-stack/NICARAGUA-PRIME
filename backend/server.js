const http = require('http');

let db_orders = [
    { route: "Chinandega ➔ Managua", cargo: "Cacao Premium (25kg)", cost: 185 },
    { route: "Masaya ➔ Granada", cargo: "Artesanías de Barro", cost: 120 }
];

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === '/api/orders' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(db_orders));
    } 
    else if (req.url === '/api/orders' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            db_orders.unshift(JSON.parse(body));
            res.writeHead(201);
            res.end();
        });
    }
});

server.listen(3000);
