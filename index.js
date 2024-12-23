const express = require('express');
var cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;
const data = require('./data');

app.use(cors());
const db = data;

app.use(express.json());

app.get('/', (req, res) => {
	return res.json(db);
});

app.get('/data/:key', (req, res) => {
  const { key } = req.params;
  if (db[key]) {
    return res.json({ key, value: db[key] });
  } else {
    return res.status(404).json({ error: 'Key not found' });
  }
});

app.post('/data', (req, res) => {
  const { key, value } = req.body;

  if (!key || value === undefined) {
    return res.status(400).json({ error: 'Key and value are required' });
  }

  db[key] = value;
  res.status(201).json({ message: 'Data saved', key, value });
});

app.listen(PORT, () => {
  console.log(data);
  console.log(`Server is running on http://localhost:${PORT}`);
});
