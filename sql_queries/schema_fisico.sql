/* CREATE [UNIQUE] INDEX  indice ON tabella (lista_attributi) */

ALTER TABLE pokedex.battles ADD PRIMARY KEY (id);
ALTER TABLE pokedex.gyms ADD PRIMARY KEY (id);
ALTER TABLE pokedex.pokemon_trainer ADD PRIMARY KEY (id);
ALTER TABLE pokedex.pokemons ADD PRIMARY KEY (id);
ALTER TABLE pokedex.trainers ADD PRIMARY KEY (id);

CREATE INDEX battle_partecipants ON pokedex.battles(first_trainer_id, last_trainer_id);
CREATE INDEX pokemon_name ON pokedex.pokemons(name);
