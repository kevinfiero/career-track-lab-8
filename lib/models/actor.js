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

};
