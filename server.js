const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3400;

// Servir les fichiers statiques du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// API simple pour retourner un message JSON
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World from API!' });
});

// Toutes les autres routes renvoient index.html (pour le frontend SPA)
// Ici on utilise une RegExp pour matcher toutes les routes non-API
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
