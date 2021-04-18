import java.util.ArrayList;
import java.util.List;

public class StatementFactory {

    /*
        (a) ciascuna transazione dovrà contenere almeno 3 operazioni
        (b) una transazione dovrà contenere solo operazioni di lettura
        (c) due transazioni dovranno contenere almeno due operazioni di aggiornamento (inserimenti, cancellazioni, modifiche) che coinvolgano un sottoinsieme delle tuple di una o più tabella della base di dati
        (d) per ogni transazione dovrà essere scelto il livello di isolamento ritenuto più adeguato, giustificandone la scelta
        (e) almeno due transazioni devono operare in scrittura su un insieme comune di tuple
        (f) almeno due transazioni devono operare in lettura su un insieme comune di tuple
        (g) almeno due transazioni devono operare rispettivamente in  lettura e scrittura su un insieme comune di tuple
        (h) almeno una transazione deve leggere almeno due volte in punti diversi del codice uno stesso insieme di tuple
        (i) per ogni transazione dovrà essere individuato un adeguato livello di isolamento
     */

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
                    "'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')"
                    , true),
            //Nome e cognome dell'allenatore con più pokemon
            new Statement("SELECT first_name, last_name FROM trainers WHERE id = (" +
                    "SELECT trainer_id FROM pokemon_trainer " +
                    "GROUP BY trainer_id ORDER BY COUNT(*) DESC LIMIT 1)", false),


    };

    private static StatementFactory statementFactory;
    private int index = 0;

    public static StatementFactory getInstance() {
        if (statementFactory == null) {
            statementFactory = new StatementFactory();
        }

        return statementFactory;
    }

    public List<Statement> getPreparedStatements(int amount) {
        ArrayList<Statement> list = new ArrayList<>();
        for (int i = 0; i < amount; i++) {
            if (index == statements.length) {
                index = 0;
            }
            list.add(statements[index]);
            index++;
        }
        return list;
    }

    public int getIndex() {
        return index;
    }


    public void setIndex(int index) {
        this.index = index;
    }
}
