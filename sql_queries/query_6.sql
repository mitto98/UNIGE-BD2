SELECT t.username, t.first_name, t.last_name, b.second_trainer
FROM (SELECT username, first_name, last_name FROM pokedex.trainers WHERE last_name = 'Panini') t
  JOIN pokedex.battles AS b ON b.first_trainer = t.username
WHERE b.win;