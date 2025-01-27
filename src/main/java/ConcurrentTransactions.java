import org.apache.log4j.BasicConfigurator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
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

        int[] levels = {
                Connection.TRANSACTION_READ_UNCOMMITTED,
                Connection.TRANSACTION_READ_COMMITTED,
                Connection.TRANSACTION_REPEATABLE_READ,
                Connection.TRANSACTION_SERIALIZABLE,
        };

        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();

        for (int level: levels) {
            int sum = 0;
            for (int j = 0; j < 3; j++) {
                sum +=  doThings(args,level);
            }
            map.put(level, sum/3);
        }

        for(int level: levels) {
            System.out.println("LEVEL ".concat(String.valueOf(level)).concat(": ").concat(String.valueOf(map.get(level))).concat(" ms"));
        }

    }

    private static long doThings(String[] args, int isolationLevel) {

        Logger logger = LoggerFactory.getLogger(ConcurrentTransactions.class);


        Instant start = Instant.now();

        BasicConfigurator.configure();

        Connection conn = null;

        StatementFactory statementFactory = StatementFactory.getInstance();


        try {
            //Class.forName("org.postgresql.Driver");
            conn = DriverManager.getConnection(url, user, pass);
            conn.setAutoCommit(false);
            conn.setTransactionIsolation(isolationLevel);
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
            if (!pool.awaitTermination(10000, TimeUnit.SECONDS)) {
                pool.shutdownNow();
                try {
                    conn.close();
                } catch (SQLException se) {
                    logger.error("Errore SQL", se);
                } catch (Exception e) {
                    logger.error("Errore generico", e);
                }
            }

            Instant finish = Instant.now();
            StatementFactory.deleteIstance();
            return Duration.between(start, finish).toMillis();
        } catch (InterruptedException e) {
            logger.error("Errore di interruzione", e);
            return 0;
        }
    }
}

