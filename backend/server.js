const express = require('express');
const app = express();
app.use(express.json());

// Simulación de base de datos (puedes usar un JSON o MongoDB después)
let productos = [
  { id: 1, nombre: "Nacatamal", precio: 120, vendedor: "Fritanga El Norte", imagen: "nacatamal.png" }
];

// Ruta para obtener todos los productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// Ruta para agregar un nuevo producto
app.post('/api/productos', (req, res) => {
  const nuevo = req.body;
  productos.push({ id: Date.now(), ...nuevo });
  res.status(201).json({ mensaje: "Producto guardado con éxito" });
});

module.exports = app;
