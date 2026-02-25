const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../Interfaz')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Pinol App corriendo en puerto ${PORT} 🇳🇮`);
});
