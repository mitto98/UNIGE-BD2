import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.List;

class Transaction extends Thread {

    // identifier of the transaction
    private int id;
    private Connection conn;
    private List<Statement> statements;

    Transaction(int id, Connection conn, List<Statement> statements) {
        this.id = id;
        this.conn = conn;
        this.statements = statements;
    }

    @Override
    public void run() {
        Logger logger = LoggerFactory.getLogger(Transaction.class);


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
                    //TODO capire dove vuole il commit, qua è brutto
                    conn.commit();
                } else {
                    ResultSet rs = conn.prepareStatement(statement.getSqlString()).executeQuery();
                    ResultSetMetaData rsmd = rs.getMetaData();
                    int columnsNumber = rsmd.getColumnCount();
                    String toPrint = String.valueOf(id).concat(":  ");
                    while (rs.next()) {
                        for (int i = 1; i < columnsNumber; i++) {
                            toPrint = toPrint.concat(rs.getString(i) + " ");
                        }
                        toPrint = toPrint.concat(" | ");
                    }
                    logger.info(toPrint);
                }
            } catch (SQLException se) {
                logger.error("Errore SQL", se);
            } catch (Exception e) {
                logger.error("Errore generico", e);
            }
        }

        logger.info("Transaction " + id + " terminated");
    }

}