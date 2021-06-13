# C Transazioni
## Descrizione delle transazioni

### Transazione 1

Requisiti: A, B, H, F

Statement 1: Selezione del nome di tutte le entità con attributo primary_type uguale a "normal", ordinate per id

Statement 2: Ottenimento dei nomi dei pokemon che hanno almeno un'istanza all'interno della tabella pokemon_trainer con attributo livello uguale a 1

Statement 3: Ottenimento di nome e primary_type dalla tabella pokemon con nome = "JUST_INVENTED" (creato in altra transazione)

### Transazione 2

Requisiti: A, C, G, E

Statement 1: Cancellazione dalla tabella trainer_gym degli elementi con attributo has_won a false e valore del timestamp attempt_date minore di un anno da NOW()

Statement 2: Ottenimento dei nomi dei pokemon che hanno almeno un'istanza all'interno della tabella pokemon_trainer con attributo livello uguale a 100

Statement 3: Insert di un nuovo elemento nella tabella trainers

### Transazione 3

Requisiti: A, G, E

Statement 1: Ottenimento di trainer dalla tabella trainer_gym degli elementi con attributo has_won a false e valore del timestamp attempt_date minore di un anno da NOW()

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
@file(../sql_queries/transactions.sql)
```

Il codice dei vari statements è visibile all'interno della classe StatementFactory.java; questa è stata formattata in modo da essere il più leggibile possibile

L'implementazione principale prevede che ogni transazioni venga committata non appena essa termini di eseguire i propri statement, di conseguenza lo scheduling ottenuto varia molto ad ogni esecuzione.
A seconda dell'ordine di esecuzione variano anche i risultati delle query presenti nelle transazioni.

## Gestione checkpoint
Il software è impostato in modo che crei un checkpoint all'inizio della transazione, prima di eseguire gli statement, e di ripristinarlo in caso di commit fallito.

Per scelta, un eventuale statement in errore viene semplicemente saltato, non compromettetendo l'intera transazione. 
In un contesto reale potrebbe non essere la scelta migliore, ma data la natura di questo progetto abbiamo preferito adoperare questo comportamento.

## Livelli di isolamento
Il livello di isolamento preimpostato è TRANSACTION_READ_COMMITTED, in questo modo ogni transazione rende visibili i propri cambiamenti solamente dopo il commit.

La modifica di questo livello dovrebbe impattare in maniera anche significativo la velocità esecuzione del programma.

Di seguito i risultati del primo test, eseguito su 40 transazioni in 40 thread, media di 5 tentativi per ciascun livello:

- TRANSACTION_READ_UNCOMMITTED  =>  5538 ms
- TRANSACTION_READ_COMMITTED    =>  5170 ms
- TRANSACTION_REPEATABLE_READ   =>  5186 ms
- TRANSACTION_SERIALIZABLE      =>  5217 ms

Stranamente al primo livello il software ha impiegato più tempo rispetto agli altri

Ripetiamo il test su 400 transazioni in 400 thread, sempre 5 tentativi per livello:
- TRANSACTION_READ_UNCOMMITTED  =>  50582 ms
- TRANSACTION_READ_COMMITTED    =>  51582 ms
- TRANSACTION_REPEATABLE_READ   =>  52135 ms
- TRANSACTION_SERIALIZABLE      =>  58589 ms

In questo caso i dati sono meno inaspettati del caso precedente. Al livello di isolamento più alto il software ha impiegato più tempo ad eseguire tutte le transazioni

Ultimo test su 4000 transazioni in 4000 thread, 5 tentativi per livello:
- TRANSACTION_READ_UNCOMMITTED  =>  510543 ms
- TRANSACTION_READ_COMMITTED    =>  519675 ms
- TRANSACTION_REPEATABLE_READ   =>  520127 ms
- TRANSACTION_SERIALIZABLE      =>  610432 ms
