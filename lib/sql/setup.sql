DROP TABLE IF EXISTS MOVIES CASCADE;
DROP TABLE IF EXISTS ACTORS CASCADE;
DROP TABLE IF EXISTS ACTORS_MOVIES_RELATIONSHIP;

CREATE TABLE MOVIES (
	movie_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	movie_title TEXT NOT NULL,
	movie_release_year INTEGER NOT NULL
);

CREATE TABLE ACTORS (
	actor_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	actor_name TEXT NOT NULL,
	actor_birth_year INTEGER NOT NULL
);

CREATE TABLE ACTORS_MOVIES_RELATIONSHIP (
	actor_id INTEGER,
	movie_id INTEGER,
	PRIMARY KEY(actor_id, movie_id)
);