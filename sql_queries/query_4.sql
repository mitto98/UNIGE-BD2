SELECT id, first_name, last_name 
FROM pokedex.trainers 
WHERE id IN (
        SELECT id 
        FROM pokedex.gyms 
        WHERE type LIKE 'rock');
