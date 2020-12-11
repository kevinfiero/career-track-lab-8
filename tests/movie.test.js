const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
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

});
