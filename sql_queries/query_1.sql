SELECT *
FROM pokedex.battles b
         JOIN pokedex.trainers AS t1 ON b.first_trainer_id = t1.id
         JOIN pokedex.trainers AS t2 ON b.second_trainer_id = t2.id
WHERE EXTRACT(YEAR FROM b.battle_date) < 2000;