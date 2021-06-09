-- Transaction 1
SELECT name
FROM pokemons
WHERE primary_type = 'normal';

SELECT name
FROM pokemons
WHERE name IN (SELECT pokemon FROM pokemon_trainer WHERE level = 1);

SELECT name, primary_type
FROM pokemons
WHERE name = 'JUST_INVENTED';

-- Transaction 2
DELETE
FROM trainer_gym
WHERE has_won IS FALSE
  AND last_attempt < NOW() - INTERVAL '1 year';

SELECT name
FROM pokemons
WHERE name IN (SELECT pokemon FROM pokemon_trainer WHERE level = 1);

INSERT INTO trainers (first_name, last_name, birth_date, gender, birth_country, is_gym_leader)
VALUES ('Ajeje', 'Brazorf', '1998/04/20', 'M', 'Kalos', TRUE);

-- Transaction 3
SELECT *
FROM trainer_gym
WHERE has_won IS FALSE
  AND last_attempt < NOW() - INTERVAL '1 year';

UPDATE trainers
SET is_gym_leader = FALSE
WHERE birth_country = 'Kalos';

SELECT COUNT(*) AS KALOS_GYM_LEADERS
FROM trainers
WHERE is_gym_leader IS TRUE
  AND birth_country = 'Kalos';

-- Transaction 4
SELECT name, primary_type
FROM pokemons
WHERE name = 'JUST_INVENTED';

INSERT INTO pokemons (name, primary_type, sprite)
VALUES ('JUST_INVENTED', 'normal', 'THIS_IS_A_SPRITE');

SELECT first_name, last_name
FROM trainers
WHERE username = (SELECT trainer FROM pokemon_trainer GROUP BY trainer ORDER BY COUNT(*) DESC LIMIT 1);
