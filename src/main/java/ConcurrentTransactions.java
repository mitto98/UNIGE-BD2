import org.apache.log4j.BasicConfigurator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * <p>
 * Run numThreads transactions, where at most maxConcurrent transactions
 * can run in parallel.
 *
 * <p>params: numThreads maxConcurrent
 */

public class ConcurrentTransactions {


    static final String url = "jdbc:postgresql://localhost:5432/postgres";
    static final String user = "postgres";
    static final String pass = "secret";

    public static void main(String[] args) {

        BasicConfigurator.configure();

        Logger logger = LoggerFactory.getLogger(ConcurrentTransactions.class);

        Connection conn = null;

        StatementFactory statementFactory = StatementFactory.getInstance();


        try {
            //Class.forName("org.postgresql.Driver");
            conn = DriverManager.getConnection(url, user, pass);
            PreparedStatement st = conn.prepareStatement("set search_path to pokedex");
            st.executeUpdate();
        } catch (SQLException se) {
            logger.error("Errore SQL durante la preparazione del DB", se);
            System.exit(-1);
        } catch (Exception e) {
            logger.error("Errore durante la preparazione del DB", e);
            System.exit(-1);
        }

        // read command line parameters
        if (args.length != 2) {
            logger.error("Invalid Params: expected <numThreads> <maxConcurrent>");
            System.exit(-1);
        }
        int numThreads = Integer.parseInt(args[0]);
        int maxConcurrent = Integer.parseInt(args[1]);

        // create numThreads transactions
        Transaction[] trans = new Transaction[numThreads];

        for (int i = 0; i < trans.length; i++) {
            trans[i] = new Transaction(i + 1, conn, statementFactory.getPreparedStatements(3));
        }


        // start all transactions using a connection pool
        ExecutorService pool = Executors.newFixedThreadPool(maxConcurrent);
        for (Transaction tran : trans) {
            pool.execute(tran);
        }
        pool.shutdown(); // end program after all transactions are done

        //CHIUSURA CONNESSIONE
        try {
            if (!pool.awaitTermination(10, TimeUnit.SECONDS)) {
                pool.shutdownNow();
                try {
                    conn.close();
                } catch (SQLException se) {
                    logger.error("Errore SQL", se);
                } catch (Exception e) {
                    logger.error("Errore generico", e);
                }
            }
        } catch (InterruptedException e) {
            logger.error("Errore di interruzione", e);
        }
    }
}

