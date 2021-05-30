SELECT t.id, t.first_name, t.last_name, b.id
FROM (SELECT id, first_name, last_name FROM pokedex.trainers WHERE last_name = 'Panini') t
  JOIN pokedex.battles AS b ON b.first_trainer_id = t.id
WHERE b.win;