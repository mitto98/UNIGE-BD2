SELECT  t1.first_name,
        t1.last_name,
        t2.first_name,
        t2.last_name,
        b.battle_date
FROM pokedex.battles b
         JOIN pokedex.trainers AS t1 ON t1.username = b.first_trainer
         JOIN pokedex.trainers AS t2 ON t2.username = b.second_trainer
WHERE EXTRACT(YEAR FROM b.battle_date) < 2000;