import com.sun.org.slf4j.internal.Logger;
import com.sun.org.slf4j.internal.LoggerFactory;

import java.sql.Connection;
import java.sql.SQLException;

class Transaction extends Thread {

    Logger logger = LoggerFactory.getLogger(Transaction.class);

    // identifier of the transaction
    private int id;
    private Connection conn;
    private Statement statement;

    Transaction(int id, Connection conn, Statement statement) {
        this.id = id;
        this.conn = conn;
        this.statement = statement;
    }

    @Override
    public void run() {
        System.out.println("transaction " + id + " started");

        int ms = (int) (Math.random() * 100);
        try {
            sleep(ms);
        } catch (Exception e) {
        }

        try {
            if(statement.isWrite()) {
                conn.prepareStatement(statement.getSqlString()).executeUpdate();
                //TODO capire dove vuole il commit, qua è brutto
                conn.commit();
            } else {
                conn.prepareStatement(statement.getSqlString()).executeQuery();
            }
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }


        System.out.println("transaction " + id + " terminated");
    }

}