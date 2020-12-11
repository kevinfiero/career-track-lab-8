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
    pool.query(fs.readFileSync('./lib/sql/setup.sql', 'utf-8'));
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
      movies: ['Lion King', 'Mystery Team', 'Solo: A Star Wars Story',  'Spider-Man: Homecoming']
    };
    const res = await request(app)
      .get(`/actor/${expectation.actorId}`)
      .expect(200);

    expect(expectation).toEqual(res.body);

  });

  it('find all actors with associated movies', async() =>  {

    await Promise.all(movieData.map(movie => Movie.insert(movie)));

    await Promise.all(actorData.map(actor => Actor.insert(actor)));

    const expectation = [
      { 
        'actorId': expect.any(String), 
        'actorName': 'Seth Rogen', 
        'actorBirthYear': '1982',
        movies: ['Lion King', 'Pineapple Express', 'Superbad', 'The Disaster Artist', 'The Interview']
      },
      { 
        'actorId': expect.any(String), 
        'actorName': 'James Earl Jones', 
        'actorBirthYear': '1931',
        movies: ['Lion King', 'Star Wars IV: A New Hope']
      },
      { 
        'actorId': expect.any(String), 
        'actorName': 'Donald Glover', 
        'actorBirthYear': '1983',
        movies: ['Lion King', 'Mystery Team', 'Solo: A Star Wars Story',  'Spider-Man: Homecoming']
      }
    ];

    const res = await request(app)
      .get('/actor')
      .expect(200);

    expect(expectation).toEqual(res.body);

  });

  it('update actor information', async() => {

    const wrongActor = {
      'actorName': 'Dold Glover',
      'actorBirthYear': '1900'
    };

    await Actor.insert(wrongActor);

    const fixedActor = {
      'actorName': 'Donald Glover',
      'actorBirthYear': '1983'
    };

    const expectation = {
      'actorId': '1',
      'actorName': 'Donald Glover',
      'actorBirthYear': '1983'
    };

    await Actor.insert(fixedActor);

    const res = await request(app)
      .put(`/actor/${expectation.actorId}`)
      .send(fixedActor)
      .expect(200);

    expect(expectation).toEqual(res.body);

  });

  it('delete actor information', async() => {

    const newActor = {
      'actorName': 'Donald Glover',
      'actorBirthYear': '1983'
    };

    await Actor.insert(newActor);

    const expectation = {
      'actorId': '1',
      'actorName': 'Donald Glover',
      'actorBirthYear': '1983'
    };

    const res = await request(app)
      .put(`/actor/${expectation.actorId}`)
      .send(newActor)
      .expect(200);

    expect(expectation).toEqual(res.body);

  });

});
