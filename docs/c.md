# C Transazioni
## Descrizione delle transazioni

### Transazione 1

Requisiti: A, B, H, F

Statement 1: Selezione del nome di tutte le entità con attributo primary_type uguale a "normal", ordinate per id

Statement 2: Ottenimento dei nomi dei pokemon che hanno almeno un'istanza all'interno della tabella pokemon_trainer con attributo livello uguale a 1

Statement 3: Ottenimento di nome e primary_type dalla tabella pokemon con nome = "JUST_INVENTED" (creato in altra transazione)

### Transazione 2

Requisiti: A, C, G, E

Statement 1: Cancellazione dalla tabella trainer_gym degli elementi con attributo has_won a false e valore del timestamp last_attempt minore di un anno da NOW()

Statement 2: Ottenimento dei nomi dei pokemon che hanno almeno un'istanza all'interno della tabella pokemon_trainer con attributo livello uguale a 100

Statement 3: Insert di un nuovo elemento nella tabella trainers

### Transazione 3

Requisiti: A, G, E

Statement 1: Ottenimento di trainer dalla tabella trainer_gym degli elementi con attributo has_won a false e valore del timestamp last_attempt minore di un anno da NOW()

Statement 2: Update della tabella trainers impostando i valori is_gym_leader a false per tutti gli elementi con attributo e birth_country = "Kalos"

Statement 3: Count degli elementi della tabella trainers con attributo is_gym_leader a true e birth_country = "Kalos"

### Transazione 4

Requisiti: A, H, F

Statement 1: Ottenimento di nome e primary_type dalla tabella pokemon con nome = "JUST_INVENTED" (creato in altra transazione)

Statement 2: Inserimento di un nuovo elemento nella tabella pokemons il cui attributo name è "JUST_INVENTED"

Statement 3: Select di first_name e last_name dalla tabella trainers il cui username compare il massimo della volte nella tabella pokemon_trainer

## Informazioni aggiuntive
Transazioni implementate in SQL
``` SQL
@file(../sql_queries/transaction.java)
```

Il codice dei vari statements è visibile all'interno della classe StatementFactory.java; questa è stata formattata in modo da essere il più leggibile possibile

## Conclusioni
L'implementazione principale prevede che ogni transazioni venga committata non appena essa termini di eseguire i propri statement, di conseguenza lo scheduling ottenuto varia molto ad ogni esecuzione. 
A seconda dell'ordine di esecuzione variano anche i risultati delle query presenti nelle transazioni.