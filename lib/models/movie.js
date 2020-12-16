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

  static async findById(id){
    const { rows } = await pool.query('select * FROM MOVIES WHERE movie_id=$1', [id]);

    if(!rows[0]) throw new Error(`No movie with id ${id}`);
    
    return new Movie(rows[0]);
  }

  static async find(){
    const { rows } = await pool.query('select * FROM MOVIES');

    return rows.map(row => new Movie(row));
  }

  static async update(movieId, { movieTitle, movieReleaseYear }){
    const { rows } = await pool.query(
      `UPDATE MOVIES SET 
        movie_title = $1, 
        movie_release_year = $2 
        WHERE movie_id = $3 RETURNING *`,
      [movieTitle, movieReleaseYear, movieId]);

    if(!rows[0]) throw new Error(`No movie with id ${movieId}`);

    return new Movie(rows[0]);
  }

  static async delete(movieId){
    const { rows } = await pool.query(
      'DELETE FROM MOVIES WHERE movie_id = $1 RETURNING *',
      [movieId]);

    if(!rows[0]) throw new Error(`No movie with id ${movieId}`);

    return new Movie(rows[0]);
  }

};
