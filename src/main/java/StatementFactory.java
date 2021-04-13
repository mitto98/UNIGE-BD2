import java.util.ArrayList;
import java.util.List;

public class StatementFactory {

    Statement[] statements = {
            new Statement("SELECT * FROM pokemons LIMIT 3", false),
            new Statement("SELECT * FROM pokemon_trainer LIMIT 3", false),
//            new Statement("SELECT * FROM battles LIMIT 3", false),
//            new Statement("SELECT * FROM trainers LIMIT 3", false),
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
