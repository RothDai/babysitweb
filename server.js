const express = require('express');
const path = require('path');
const app = express();

// Si tus archivos están en carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Para SPA o rutas internas: siempre devolver index.html si no coincide
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
