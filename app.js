const Movie = require('./lib/models/movie');
const Actor = require('./lib/models/actor');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/actor', async(req, res) => {
  const actor = await Actor.insert(req.body);
  res.send(actor);
});

module.exports = app;
