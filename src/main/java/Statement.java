public class Statement {
    private String sqlString;
    private boolean write;

    public Statement(String sqlString, boolean write) {
        this.sqlString = sqlString;
        this.write = write;
    }

    public Statement() {
    }

    public String getSqlString() {
        return sqlString;
    }

    public void setSqlString(String sqlString) {
        this.sqlString = sqlString;
    }

    public boolean isWrite() {
        return write;
    }

    public void setWrite(boolean write) {
        this.write = write;
    }
}
