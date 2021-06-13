SELECT t.username, t.first_name, t.last_name, b.second_trainer
FROM pokedex.trainers t
  JOIN pokedex.battles AS b ON b.first_trainer = t.username
WHERE last_name = 'Panini' AND b.win;