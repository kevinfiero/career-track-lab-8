const pool = require('../utils/pool');
const Actor = require('./actor');

module. exports = class Actor {
  movieId;
  movieName;
  movieReleaseYear;

  constructor(row){
    this.movieId = String(row.actor_id);
    this.movieName = row.movie_name;
    this.movieReleaseYear = String(row.movie_release_year);
  }

};
