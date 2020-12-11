const Movie = require('./models/movie');
const Actor = require('./models/actor');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/actor', async(req, res) => {
  const actor = await Actor.insert(req.body);
  res.send(actor);
});

app.post('/movie', async(req, res) => {
  const actor = await Movie.insert(req.body);
  res.send(actor);
});

app.get('/actor/:id', async(req, res) => {
  const actor = await Actor.findById(req.params.id);
  res.send(actor);
});

module.exports = app;
