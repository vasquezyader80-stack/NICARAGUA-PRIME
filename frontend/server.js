const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Base de datos local simulada para productos de Chinandega
const productosChinandega = [
  { id: 101, nombre: "Ron Artesanal 5 Años", precio: 45, moneda: "Cacaos" },
  { id: 102, nombre: "Sal Marina con Hierbas", precio: 8.5, moneda: "Cacaos" },
  { id: 103, nombre: "Mesa de Centro Tropical", precio: 450, moneda: "Cacaos" }
];

app.get('/api/products', (req, res) => {
    res.json(productosChinandega);
});

// El puerto debe ser dinámico para Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
