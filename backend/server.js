const http = require('http');

let db = [
    { cargo: "Café de Matagalpa", route: "Estelí -> Managua", cost: 350, status: "Entregado" },
    { cargo: "Cuero de León", route: "León -> Masaya", cost: 210, status: "En Ruta" }
];

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === '/api/logistics' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(db));
    } 
    else if (req.url === '/api/logistics' && req.method === 'POST') {
        let body = '';
        req.on('data', c => body += c);
        req.on('end', () => {
            const newOrder = JSON.parse(body);
            db.unshift(newOrder);
            
            // Simulación Logística: En 10 segundos se entrega automáticamente
            setTimeout(() => {
                newOrder.status = "Entregado";
            }, 10000);

            res.writeHead(201);
            res.end();
        });
    }
});

server.listen(3000);
