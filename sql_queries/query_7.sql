SELECT DISTINCT p.name FROM pokedex.pokemons p
JOIN pokedex.pokemon_trainer AS pt ON pt.pokemon = p.name
JOIN pokedex.trainers AS t ON t.username = pt.trainer
WHERE pt.gender = 'F' AND pt.level > 50 and t.first_name = 'Goofy';
