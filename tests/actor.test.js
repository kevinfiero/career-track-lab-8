const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const fs = require('fs');
const movieData = require('../lib/data/moviesData');
const actorData = require('../lib/data/actorsData');
const Actor = require('../lib/models/actor');
const Movie = require('../lib/models/movie');

describe('test actor model', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./lib/sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('insert actor', async() => {
    const newActor = {
      'actorName': 'Donald Glover',
      'actorBirthYear': '1983'
    };

    const expectation = {
      'actorId': '1',
      'actorName': 'Donald Glover',
      'actorBirthYear': '1983'
    };

    const res = await request(app)
      .post('/actor')
      .send(newActor)
      .expect(200);

    expect(expectation).toEqual(res.body);

  });

  it('find actor by id with associated movies', async() =>  {

    await Promise.all(movieData.map(movie => Movie.insert(movie)));

    await Promise.all(actorData.map(actor => Actor.insert(actor)));

    const expectation = {
      'actorId': '1', 
      'actorName': 'Donald Glover', 
      'actorBirthYear': '1983',
      movies: ['Mystery Team', 'Solo: A Star Wars Story', 'Lion King', 'Spider-Man: Homecoming']
    };
    const res = await request(app)
      .get(`/actor/${expectation.actorId}`)
      .expect(200);

      console.log(res.body);
      console.log(expectation);
    expect(expectation).toEqual(res.body);


  });

});
