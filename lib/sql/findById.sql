select ACTORS.*, array_agg(MOVIES.movie_title) AS movies
FROM ACTORS
JOIN ACTORS_MOVIES_RELATIONSHIP as AMR
ON ACTORS.actor_id = AMR.actor_id
JOIN MOVIES
ON MOVIES.movie_id = AMR.movie_id
WHERE ACTORS.actor_id = 1
GROUP BY ACTORS.actor_id;