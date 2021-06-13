SELECT username, first_name, last_name
FROM pokedex.trainers t
JOIN pokedex.gyms AS g ON g.gym_leader = t.username
WHERE g.type = 'rock';
