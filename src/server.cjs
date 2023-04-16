const app = require('express');
const cors = require('cors');

const server = app();

server.use(cors());
server.use(app.json());

const languages = ["TypeScript"];

server.get('/api/languages', (req, res) => {
  res.json({language: languages});
});

server.post('/api/create', (req, res) => {
  const record = req.body.record;
  languages.push(record);
  res.json({ status: 'ok' });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
