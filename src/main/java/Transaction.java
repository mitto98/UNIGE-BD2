import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Transaction extends Thread {

    // identifier of the transaction
    private int id;
    private Connection conn;
    private List<Statement> statements;
    private Logger logger = LoggerFactory.getLogger(Transaction.class);
    private Savepoint savepoint;

    Transaction(int id, Connection conn, List<Statement> statements) {
        this.id = id;
        this.conn = conn;
        this.statements = statements;
    }

    @Override
    public void run() {

        //logger.info("Transaction " + id + " started");

        try {
            this.savepoint = this.conn.setSavepoint();
        } catch (SQLException throwables) {
            logger.error("Impossibile settare un checkpoint", throwables);
        }


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
                    //logger.info(results.toString());
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
            try {
                this.conn.rollback(this.savepoint);
            } catch (SQLException throwables) {
                logger.error("Impossibile ripristinare un checkpoint", throwables);
            }
        }

    }

    public void commit() throws SQLException {
        this.conn.commit();
        //logger.info("Transaction " + id + " committed");
    }

    public List<Map> resultSetToArrayList(ResultSet rs) throws SQLException{
        ResultSetMetaData md = rs.getMetaData();
        int columns = md.getColumnCount();
        ArrayList list = new ArrayList(50);
        while (rs.next()){
            HashMap row = new HashMap(columns);
            for(int i=1; i<=columns; ++i){
                row.put(md.getColumnName(i),rs.getObject(i));
            }
            list.add(row);
        }

        return list;
    }

}