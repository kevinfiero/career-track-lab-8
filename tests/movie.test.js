const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const movieData = require('../lib/data/moviesdata');
const fs = require('fs');
const Actor = require('../lib/models/actor');
const Movie = require('../lib/models/movie');

describe('test movie model', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./lib/sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('insert movie', async() => {
    const newMovie = {
      'movieTitle': 'Mystery Team',
      'movieReleaseYear': '2009'
    };

    const expectation = {
      'movieId': '1',
      'movieTitle': 'Mystery Team',
      'movieReleaseYear': '2009'
    };

    const res = await request(app)
      .post('/movie')
      .send(newMovie)
      .expect(200);

    expect(expectation).toEqual(res.body);

  });

  it('find movie by id', async() => {
    const newMovie = await Movie.insert({
      'movieTitle': 'Mystery Team',
      'movieReleaseYear': '2009'
    });

    const expectation = {
      'movieId': '1',
      'movieTitle': 'Mystery Team',
      'movieReleaseYear': '2009'
    };

    const res = await request(app)
      .get(`/movie/${newMovie.movieId}`)
      .expect(200);

    expect(expectation).toEqual(res.body);

  });

  it('find all movies', async() => {

    const movies = await Promise.all(movieData.map(movie => Movie.insert(movie)));

    return await request(app)
      .get('/movie/')
      .expect(200)
      .then((res => {
        movies.forEach(movie => {
          expect(res.body).toContainEqual(movie);
        });
      }));
  });

  it('update movie by id', async() => {
    const wrongMovie = await Movie.insert({
      'movieTitle': 'Crazy Team',
      'movieReleaseYear': '1009'
    });

    const correctMovie = {
      'movieId': '1',
      'movieTitle': 'Mystery Team',
      'movieReleaseYear': '2009'
    };

    const expectation = {
      'movieId': '1',
      'movieTitle': 'Mystery Team',
      'movieReleaseYear': '2009'
    };

    const res = await request(app)
      .put(`/movie/${wrongMovie.movieId}`)
      .send(correctMovie)
      .expect(200);

    expect(expectation).toEqual(res.body);

  });

  it('delete movie by id', async() => {
    const newMovie = await Movie.insert({
      'movieTitle': 'Crazy Team',
      'movieReleaseYear': '1009'
    });

    const res = await request(app)
      .delete(`/movie/${newMovie.movieId}`)
      .expect(200);
      
    expect(newMovie).toEqual(res.body);

  });

});
