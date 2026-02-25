const http = require('http');

// Base de Datos Volátil (Se integrará a MongoDB en la fase 2)
let globalOrders = [
    { id: "NS-771", route: "Chinandega -> León", cargo: "Cacao Orgánico (50kg)", cost: 240 },
    { id: "NS-772", route: "Managua -> Rivas", cargo: "Mobiliario Madera", cost: 680 }
];

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/api/orders' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(globalOrders));
    } 
    
    else if (req.url === '/api/orders' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const order = JSON.parse(body);
            order.id = "NS-" + Math.floor(Math.random() * 999);
            globalOrders.unshift(order); // Prioridad a lo nuevo
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(order));
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(3000);
