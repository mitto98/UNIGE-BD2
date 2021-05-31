-- Q1
ALTER TABLE pokedex.trainers
    ADD PRIMARY KEY (id);

CLUSTER pokedex.trainers USING trainers_pkey;

ALTER TABLE pokedex.pokemons
    ADD PRIMARY KEY (id);

CLUSTER pokedex.pokemons USING pokemons_pkey;

-- Q3: Passa da 498933ms a 142987ms, elimina una full scan
CREATE INDEX battles_first_trainer_id_second_trainer_id_idx ON pokedex.battles (first_trainer_id, second_trainer_id);

CREATE INDEX pokemon_trainer_pokemon_id_idx ON pokedex.pokemon_trainer (pokemon_id);

CREATE INDEX trainers_first_name_last_name_idx ON pokedex.trainers (first_name, last_name);

-- Q4 remove full scan from the group function query
CREATE INDEX gyms_type_idx ON pokedex.gyms (type);

CREATE INDEX trainer_gym_has_won_idx ON pokedex.trainer_gym (has_won);

CREATE INDEX pokemons_name_idx ON pokedex.pokemons (name);

