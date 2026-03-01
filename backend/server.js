const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'productos.json');

// Leer productos
app.get('/api/productos', (req, res) => {
    const data = fs.readFileSync(DATA_FILE);
    res.json(JSON.parse(data));
});

// Guardar nuevo producto
app.post('/api/productos', (req, res) => {
    const productos = JSON.parse(fs.readFileSync(DATA_FILE));
    const nuevoProducto = { id: Date.now(), ...req.body };
    productos.push(nuevoProducto);
    fs.writeFileSync(DATA_FILE, JSON.stringify(productos));
    res.status(201).json(nuevoProducto);
});

module.exports = app;
