## Appendice (Parte C)

[comment]: <> (**FILE:** labo.java)

[comment]: <> (``` java)

[comment]: <> (@file&#40;../src/main/java/labo.java&#41;)

[comment]: <> (```)

**Statements divisi per transazione**

``` java
    Statement[] statements = {
            /* Transazione 1 (A, B, H, F)*/
            //Tutti i pokemon normale/volante
            new Statement("SELECT id,name FROM pokemons WHERE primary_type = 'normal' ORDER BY id", false),
            //Tutti pokemon con almeno un'istanza a livello 1
            new Statement("SELECT name FROM pokemons WHERE id IN (SELECT pokemon_id FROM pokemon_trainer WHERE level = 1)", false),
            //Ottenimento Pokemon
            new Statement("SELECT id, name, primary_type FROM pokemons WHERE name = 'JUST_INVENTED'", false),

            /* Transazione 2 (A, C, G, E) */
            //Cancellazione delle battaglie in palestra non vinte e più vecchie di un anno
            new Statement("DELETE FROM trainer_gym WHERE has_won IS FALSE AND last_attempt < NOW() - INTERVAL '1 year'", true),
            //Tutti pokemon con almeno un'istanza a livello 1
            new Statement("SELECT name from pokemons where id IN (SELECT pokemon_id FROM pokemon_trainer where level = 1)", false),
            //Inserimento nuovo allenatore
            new Statement("INSERT INTO trainers (first_name, last_name, birth_date, gender, birth_country, is_gym_leader) " +
                    "VALUES ('Ajeje', 'Brazorf', '1998/04/20', 'M', 'Kalos', TRUE)", true),


            /* Transazione 3 (A, G, E) */
            //Battaglie in palestra non vinte e più vecchie di un anno
            new Statement("SELECT trainer_id FROM trainer_gym WHERE has_won IS FALSE AND last_attempt < NOW() - INTERVAL '1 year'", false),
            //Licenziamento di tutti i capopalestra di Kalos
            new Statement("UPDATE trainers SET is_gym_leader = FALSE WHERE birth_country = 'Kalos'", true),
            //Tutti i capopalestra di Kalos
            new Statement("SELECT COUNT(*) AS KALOS_GYM_LEADERS FROM trainers WHERE is_gym_leader IS TRUE AND birth_country = 'Kalos'", false),


            /* Transazione 4 (A, H, F) */
            //Ottenimento Pokemon
            new Statement("SELECT id, name, primary_type FROM pokemons WHERE name = 'JUST_INVENTED'", false),
            //Creazione Pokemon Pokemon
            new Statement("INSERT INTO pokemons (name, primary_type, sprite) VALUES ('JUST_INVENTED', 'normal', " +
                    'JUST_A_BASE64'", true),
            //Nome e cognome dell'allenatore con più pokemon
            new Statement("SELECT first_name, last_name FROM trainers WHERE id = (" +
                    "SELECT trainer_id FROM pokemon_trainer " +
                    "GROUP BY trainer_id ORDER BY COUNT(*) DESC LIMIT 1)", false),
    };
```

**Esecuzione delle transazioni**

``` java
    for (int i = 0; i < trans.length; i++) {
        trans[i] = new Transaction(i + 1, conn, statementFactory.getPreparedStatements(3));
    }
    
    // start all transactions using a connection pool
    ExecutorService pool = Executors.newFixedThreadPool(maxConcurrent);
    for (Transaction tran : trans) {
        pool.execute(tran);
    }
    pool.shutdown(); // end program after all transactions are done
```


**Ciclo di vita di una transazione**
``` java
    @Override
    public void run() {

        logger.info("Transaction " + id + " started");

        int ms = (int) (Math.random() * 100);
        try {
            sleep(ms);
        } catch (Exception ignored) {
        }

        for (Statement statement : statements) {
            try {
                if (statement.isWrite()) {
                    conn.prepareStatement(statement.getSqlString()).executeUpdate();
                } else {
                    ResultSet rs = conn.prepareStatement(statement.getSqlString()).executeQuery();
                    List<Map> results = resultSetToArrayList(rs);
                    logger.info(results.toString());
                }
            } catch (SQLException se) {
                logger.error("Errore SQL", se);
            } catch (Exception e) {
                logger.error("Errore generico", e);
            }
        }

        try {
            this.commit();
        } catch (SQLException e) {
            logger.error("Impossibile committare la transazione " + id, e);
        }

    }
```


**Considerazioni**

``` java
Lo scheduling ottenuto varia molto ad ogni esecuzione. A seconda dell\'ordine di esecuzione variano anche i risultati delle query 
presenti nelle transazioni.
```