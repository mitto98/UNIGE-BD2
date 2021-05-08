-- Parte D

-- Allenatore semplice: puo interagire con pokemon_trainer e battles in scrittura, e con trainers, pokemons e trainer_gym in lettura
-- Capopalestra: come trainer, ma può scrivere in trainer_gym
-- Professore: può leggere tutto, scrivere in pokemons (nuova specie scoperta), trainers (nuovo allenatore registrato), battles
-- Dio: può fare qualsiasi cosa, equivale ad admin

CREATE ROLE trainer;
CREATE ROLE gym_leader;
CREATE ROLE professor;
CREATE ROLE god;

CREATE USER generic_trainer WITH ROLE trainer;
CREATE USER other_generic_trainer WITH ROLE trainer;
CREATE USER generic_gym_leader WITH ROLE gym_leader;
CREATE USER generic_professor WITH ROLE professor;
CREATE USER arceus WITH ROLE god;

-- Ruoli trainer
GRANT SELECT, INSERT, UPDATE, DELETE ON pokedex.pokemon_trainer TO trainer;
GRANT SELECT, INSERT ON pokedex.battles TO trainer;
GRANT SELECT ON pokedex.trainers TO trainer;
GRANT SELECT ON pokedex.trainer_gym TO trainer;

-- Ruoli gym_leader
GRANT trainer to gym_leader;
GRANT INSERT, UPDATE ON pokedex.trainer_gym TO trainer;

--Ruoli professor
GRANT SELECT ON ALL TABLES IN SCHEMA pokedex TO professor;
GRANT INSERT, UPDATE ON pokedex.pokemons TO professor;
GRANT INSERT, UPDATE ON pokedex.trainers TO professor;
GRANT INSERT ON pokedex.battles TO professor;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA pokedex TO god;

--TODO punto 4

REVOKE trainer FROM other_generic_trainer;
REVOKE UPDATE ON pokedex.pokemon_trainer FROM trainer CASCADE; --Lo estende anche a gym_leader
REVOKE INSERT ON pokedex.battles FROM trainer RESTRICT ; --Limitato a trainer