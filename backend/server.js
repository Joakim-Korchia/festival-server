import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Le serveur roule du feu de dieu sur le port ${PORT}`);
});