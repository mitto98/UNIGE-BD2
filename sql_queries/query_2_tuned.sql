SELECT p.name, count(pt.trainer)
FROM pokedex.pokemons p
    JOIN pokedex.pokemon_trainer AS pt ON p.name = pt.pokemon
WHERE NOT p.name LIKE 'Missingno %'
GROUP BY p.name
HAVING count(p.name) > 10
ORDER BY count(pt.trainer) DESC;