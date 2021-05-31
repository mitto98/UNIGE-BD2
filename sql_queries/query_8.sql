SELECT first_name, last_name
FROM pokedex.trainers 
WHERE username NOT IN (SELECT DISTINCT trainer
                  FROM pokedex.trainer_gym 
                  WHERE has_won IS NOT TRUE);