const pool = require('../utils/pool');
const Movie = require('./movie');

module.exports = class Actor {
  actorId;
  actorName;
  actorBirthYear;

  constructor(row){
    this.actorId = String(row.actor_id);
    this.actorName = row.actor_name;
    this.actorBirthYear = String(row.actor_birth_year);
  }

  static async insert({ actorName, actorBirthYear }, movies = []) {
    const { rows } = await pool.query(
      'INSERT INTO ACTORS (actor_name, actor_birth_year) VALUES ($1, $2) RETURNING *',
      [actorName, actorBirthYear]
    );

    await pool.query(
      `INSERT INTO ACTORS_MOVIES_RELATIONSHIP (actor_id, movie_id)
      SELECT ${rows[0].actor_id}, movie_id FROM MOVIES WHERE movie_title = ANY($1::text[])`,
      [movies]
    );

    return new Actor(rows[0]);
  }

};
