SELECT id, first_name, last_name
FROM pokedex.trainers 
WHERE id NOT IN (SELECT DISTINCT trainer_id
                  FROM pokedex.trainer_gym 
                  WHERE has_won IS FALSE OR NULL);