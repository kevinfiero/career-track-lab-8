const pool = require('../utils/pool');
const Movie = require('./movie');

module. exports = class Actor {
  actorId;
  actorName;
  actorBirthYear;

  constructor(row){
    this.actorId = String(row.actor_id);
    this.actorName = row.actor_name;
    this.actorBirthYear = String(row.actor_birth_year);
  }

  static async insert({ actorName, actorBirthYear }) {
    const { rows } = await pool.query(
      'INSERT INTO ACTORS (actor_name, actor_birth_year) VALUES ($1, $2) RETURNING *',
      [actorName, actorBirthYear]
    );

    return new Actor(rows[0]);
  }

};
