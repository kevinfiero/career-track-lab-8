const pool = require('../utils/pool');
const Actor = require('./actor');

module.exports = class Movie {
  movieId;
  movieTitle;
  movieReleaseYear;

  constructor(row){
    this.movieId = String(row.movie_id);
    this.movieTitle = row.movie_title;
    this.movieReleaseYear = String(row.movie_release_year);
  }

  static async insert({ movieTitle, movieReleaseYear }) {
    const { rows } = await pool.query(
      'INSERT INTO MOVIES (movie_title, movie_release_year) VALUES ($1, $2) RETURNING *',
      [movieTitle, movieReleaseYear]
    );

    return new Movie(rows[0]);
  }

};
