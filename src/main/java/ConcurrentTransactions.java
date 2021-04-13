import com.sun.org.slf4j.internal.Logger;
import com.sun.org.slf4j.internal.LoggerFactory;

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

        Logger logger = LoggerFactory.getLogger(ConcurrentTransactions.class);

        Connection conn = null;

        List<Statement> statements = StatementFactory.getPreparedStatements();

        try {
            //Class.forName("org.postgresql.Driver");
            conn = DriverManager.getConnection(url, user, pass);
            PreparedStatement st = conn.prepareStatement("set search_path to pokedex");
            st.executeUpdate();
        } catch (SQLException se) {
            logger.error("Errore SQL", se);
        } catch (Exception e) {
            logger.error("Errore generico", e);
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
        for(Statement statement: statements) {
            //TODO da capire cosa fare se threads > statements... si ricicla?
            for (int i = 0; i < trans.length; i++) {
                trans[i] = new Transaction(i + 1, conn, statement);
            }
            //Nessun thread rimanente, stop
            break;
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
            logger.error("Errore di interruzione",e);
        }
    }
}

