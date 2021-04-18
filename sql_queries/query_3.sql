SELECT t.id,
       t.first_name,
       t.last_name,
       (SELECT count(*)
        FROM pokedex.battles b
        WHERE b.second_trainer_id = t.id OR b.first_trainer_id = t.id) AS battles
FROM pokedex.trainers t;