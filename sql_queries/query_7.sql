SELECT DISTINCT p.name FROM pokedex.pokemons p
JOIN pokedex.pokemon_trainer AS pt ON pt.pokemon_id = p.id
JOIN pokedex.trainer AS t ON t.id = pt.trainer_id
WHERE pt.gender = 'F' AND pt.level > 50 and t.first_name = 'Goofy';
