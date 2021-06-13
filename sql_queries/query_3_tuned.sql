SELECT t.username,
       count(t.username) AS battles
FROM pokedex.trainers t
    LEFT JOIN pokedex.battles b ON b.second_trainer = t.username
           OR b.first_trainer = t.username
WHERE t.first_name = 'Jolly'
GROUP BY t.username;