const http = require('http');

let activeShipments = [
    { manifest: "30 Sacos de Granos Básicos", route: "Chinandega -> Puerto Corinto", cost: 1450 },
    { manifest: "Maquinaria Agrícola", route: "Managua -> Estelí", cost: 3200 }
];

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    if (req.url === '/api/logistics' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(activeShipments));
    } 
    
    else if (req.url === '/api/logistics' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            activeShipments.unshift(JSON.parse(body));
            res.writeHead(201);
            res.end();
        });
    }
});

server.listen(3000);
