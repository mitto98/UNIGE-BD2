SELECT p.id, p.name, count(pt.id) 
FROM pokedex.pokemons p
    JOIN pokedex.pokemon_trainer AS pt ON p.id = pt.pokemon_id
WHERE NOT p.name LIKE 'Missingno %'
GROUP BY p.id, p.name
HAVING count(p.id) > 10
ORDER BY count(pt.id) DESC;