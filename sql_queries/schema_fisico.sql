CREATE INDEX trainers_username_idx ON pokedex.trainers (username);

CLUSTER pokedex.trainers USING trainers_username_idx;

CREATE INDEX pokemons_name_idx ON pokedex.pokemons (name);

CLUSTER pokedex.pokemons USING pokemons_name_idx;

CREATE INDEX battles_first_trainer_second_trainer_idx ON pokedex.battles (first_trainer, second_trainer);

CREATE INDEX pokemon_trainer_pokemon_idx ON pokedex.pokemon_trainer (pokemon);

CREATE INDEX trainers_first_name_last_name_idx ON pokedex.trainers (first_name, last_name);

CREATE INDEX gyms_type_idx ON pokedex.gyms (type);

CREATE INDEX trainer_gym_trainer_has_won_idx ON pokedex.trainer_gym (has_won);

