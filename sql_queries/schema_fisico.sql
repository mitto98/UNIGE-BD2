-- PK == Unique Clustered Index

-- Q1
ALTER TABLE pokedex.trainers ADD PRIMARY KEY (id); 


-- Q1: non serve, fa comunque la scan per prendere gli altri dati delle battagli
-- Q3: Passa da 498933ms a 142987ms, elimina una full scan
CREATE INDEX battle_partecipants ON pokedex.battles(first_trainer_id, second_trainer_id);


--Q2 serve solo per pokemon_id, ma dato che usa funz di gruppo, non serve
CREATE INDEX pt_pokemon_trainer ON pokedex.pokemon_trainer(pokemon_id);


-- Q3 se aggiungo id non migliora, devo capire perche! (Se ho una query nella proiezione, allora fa una fullscan sempre);
CREATE INDEX trainer_name ON pokedex.trainers(first_name, last_name);


-- Q4 remove full scan from the group function query
CREATE INDEX gym_type ON pokedex.gyms(type);

CREATE INDEX has_won_match ON pokedex.trainer_gym(has_won);





-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
ALTER TABLE pokedex.battles ADD PRIMARY KEY (id);
ALTER TABLE pokedex.gyms ADD PRIMARY KEY (id);
ALTER TABLE pokedex.pokemon_trainer ADD PRIMARY KEY (id);
ALTER TABLE pokedex.pokemons ADD PRIMARY KEY (id);



CREATE INDEX pokemon_name ON pokedex.pokemons(name);
