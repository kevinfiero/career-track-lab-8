const Movie = require('./models/movie');
const Actor = require('./models/actor');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/actor', async(req, res, next) => {
  const actor = await Actor
    .insert(req.body)
    .catch(next);
  res.send(actor);
});

app.post('/movie', async(req, res, next) => {
  const actor = await Movie
    .insert(req.body)
    .catch(next);
  res.send(actor);
});

app.get('/actor/:id', async(req, res, next) => {
  const actor = await Actor
    .findById(req.params.id)
    .catch(next);
  res.send(actor);
});

app.get('/actor', async(req, res, next) => {
  const actor = await Actor
    .find()
    .catch(next);
  res.send(actor);
});

app.put('/actor/:id', async(req, res, next) => {
  const actor = await Actor
    .update(req.params.id, req.body)
    .catch(next);
  res.send(actor);
});

app.delete('/actor/:id', async(req, res, next) => {
  const actor = await Actor
    .delete(req.params.id)
    .catch(next);
  res.send(actor);
});

module.exports = app;
