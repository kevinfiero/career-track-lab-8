const request = require('supertest');
const app = require('../app');
const pool = require('../lib/utils/pool');
const fs = require('fs');
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

  });

});
