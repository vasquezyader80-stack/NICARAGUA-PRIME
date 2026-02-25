const http = require('http');

let db_orders = [
    { cargo: "50 Sacos de Maíz", route: "Chinandega -> León", cost: 1200 },
    { cargo: "Mobiliario Artesanal", route: "Masaya -> Managua", cost: 850 }
];

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'GET' && req.url === '/api/orders') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(db_orders));
    } else if (req.method === 'POST' && req.url === '/api/orders') {
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
