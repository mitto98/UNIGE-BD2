# PARTE A: Scelta dello strumento e creazione della base di dati

https://www.postgresql.org/docs/9.1/sql-cluster.html
When a table is clustered, it is physically reordered based on the index information. Clustering is a one-time operation: when the table is subsequently updated, the changes are not clustered. That is, no attempt is made to store new or updated rows according to their index order. (If one wishes, one can periodically recluster by issuing the command again. Also, setting the table's FILLFACTOR storage parameter to less than 100% can aid in preserving cluster ordering during updates, since updated rows are kept on the same page if enough space is available there.)


Database in esame:
- MySql
- MariaDB
- PostgresSQL
- MSSQL
- Oracle DB

https://hackr.io/blog/mariadb-vs-mysql
https://hackr.io/blog/postgresql-vs-mysql
https://hackr.io/blog/mariadb-vs-mysql