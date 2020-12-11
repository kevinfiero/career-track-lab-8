const movieData = require('./lib/data/moviesData');
const actorData = require('./lib/data/actorsData');
const Actor = require('./lib/models/actor');
const Movie = require('./lib/models/movie');
const pool = require('./lib/utils/pool');
const fs = require('fs');

const populateData = async() => {

  await pool.query(fs.readFileSync('./lib/sql/setup.sql', 'utf-8'));

  await Promise.all(movieData.map(movie => Movie.insert(movie)));

  await Promise.all(actorData.map(actor => Actor.insert(actor, actor.movies)));

  await pool.end();

};

populateData();

