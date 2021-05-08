SELECT * 
FROM pokedex.trainers 
WHERE id NOT IN (SELECT DISTINCT trainer_id 
                  FROM pokedex.trainer_gym 
                  WHERE NOT has_won);