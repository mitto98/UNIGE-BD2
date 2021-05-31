SELECT t.first_name,
       t.last_name,
       (SELECT count(*)
        FROM pokedex.battles b
        WHERE b.second_trainer = t.username OR b.first_trainer = t.username) AS battles
FROM pokedex.trainers t;