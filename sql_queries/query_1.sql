SELECT  t1.first_name, 
        t1.last_name, 
        t2.first_name, 
        t2.last_name, 
        b.battle_date
FROM pokedex.battles b
         JOIN pokedex.trainers AS t1 ON b.first_trainer= t1.username
         JOIN pokedex.trainers AS t2 ON b.second_trainer = t2.username
WHERE EXTRACT(YEAR FROM b.battle_date) < 2000;