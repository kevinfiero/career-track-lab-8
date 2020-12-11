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

  static async insert({ actorName, actorBirthYear, movies = [] }) {
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

  static async findById(id){
    const { rows } = await pool.query(
      `select ACTORS.*, array_agg(MOVIES.movie_title) AS movies
      FROM ACTORS
      JOIN ACTORS_MOVIES_RELATIONSHIP as AMR
      ON ACTORS.actor_id = AMR.actor_id
      JOIN MOVIES
      ON MOVIES.movie_id = AMR.movie_id
      WHERE ACTORS.actor_id = $1
      GROUP BY ACTORS.actor_id
      ORDER BY MOVIES DESC`,
      [id]
    );
    
    if(!rows[0]) throw new Error(`No actor with id ${id}`);
   
    return {
      ...new Actor(rows[0]),
      movies: rows[0].movies
    };
  }

  static async find(){
    const { rows } = await pool.query(
      `select ACTORS.*, array_agg(MOVIES.movie_title ORDER BY movie_title) AS movies
      FROM ACTORS
      JOIN ACTORS_MOVIES_RELATIONSHIP as AMR
      ON ACTORS.actor_id = AMR.actor_id
      JOIN MOVIES
      ON MOVIES.movie_id = AMR.movie_id
      GROUP BY ACTORS.actor_id
      ORDER BY actor_name desc`
    );
   
    return [{
      ...new Actor(rows[0]),
      movies: rows[0].movies
    },
    {
      ...new Actor(rows[1]),
      movies: rows[1].movies
    },
    {
      ...new Actor(rows[2]),
      movies: rows[2].movies
    }];
  }

};
