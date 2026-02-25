// Usamos el módulo 'http' nativo de Node.js para máxima compatibilidad y evitar errores de dependencias
const http = require('http');

const server = http.createServer((req, res) => {
  // Configuramos cabeceras para permitir que tu frontend lea los datos (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  // Ruta básica para verificar que el servidor está vivo
  if (req.url === '/api/status' || req.url === '/api/') {
    res.writeHead(200);
    return res.end(JSON.stringify({ 
      status: "online", 
      message: "Servidor de Tierra Nica Pro funcionando ✅",
      version: "1.0.1"
    }));
  }

  // Respuesta para rutas no encontradas
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Ruta no encontrada" }));
});

// Vercel asigna el puerto automáticamente
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(Servidor activo en puerto ${PORT});
});    
