SELECT username, first_name, last_name
FROM pokedex.trainers 
WHERE username IN (SELECT DISTINCT gym_leader
                FROM pokedex.gyms 
                WHERE type = 'rock');
