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
            /* Transazione 1 (punto B)*/
            //Tutti i pokemon normale/volante
            new Statement("SELECT id,name FROM pokemons where primary_type = 'normal' and secondary_type = 'flying' order by id", false),
            //Tutti pokemon con almeno un'istanza a livello 1
            new Statement("SELECT name from pokemons where id in (SELECT pokemon_id FROM pokemon_trainer where level = 1)", false),
            //Nome e cognome dell'allenatore con più pokemon
            new Statement("select first_name, last_name from trainers where id = (" +
                    "select trainer_id from pokemon_trainer " +
                    "group by trainer_id order by count(*) desc limit 1)", false),

            /* Transazione 2 */

            /* Transazione 3 */

            /* Transazione 1 */


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
