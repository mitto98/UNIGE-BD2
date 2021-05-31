SELECT t.username,
       (SELECT count(*)
        FROM pokedex.battles b
        WHERE b.second_trainer = t.username
           OR b.first_trainer = t.username) AS battles
FROM pokedex.trainers t
WHERE t.first_name = 'Jolly';