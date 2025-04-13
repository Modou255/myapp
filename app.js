const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello CI/CD World!');
});

// Export pour les tests
module.exports = app;

// Démarrer le serveur seulement si exécuté directement
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
