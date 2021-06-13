# PARTE A: Scelta dello strumento e creazione della base di dati

Strumento scelto: PostgreSQL

## I DBMS presi in considerazione

### PostgreSQL

PostgreSQL è un database open source. L’uso di postgreSQL sia per uso privato che per uso commerciale è gratuito; sotto il PostgreSQL Global Development Group , postgre è disponibile gratuitamente e open source.
La programmabilità di PostgreSQL è il suo principale punto di forza ed il principale vantaggio verso i suoi concorrenti: PostgreSQL rende più semplice costruire applicazioni per il mondo reale, utilizzando i dati prelevati dalla base di dati.
La conversione delle informazioni dal mondo SQL a quello della programmazione orientata agli oggetti, presenta difficoltà dovute principalmente al fatto che i due mondi utilizzano differenti modelli di organizzazione dei dati. L'industria chiama questo problema “Impedance mismatch” (conflitto di impedenza): mappare i dati da un modello all'altro può assorbire fino al 40% del tempo di sviluppo di un progetto. Un certo numero di soluzioni di mappatura, normalmente dette “object-relational mapping”, possono risolvere il problema, ma tendono ad essere costose e ad avere i loro problemi, causando scarse prestazioni o forzando tutti gli accessi ai dati ad aver luogo attraverso il solo linguaggio che supporta la mappatura stessa.
PostgreSQL può risolvere molti di questi problemi direttamente nella base di dati. PostgreSQL permette agli utenti di definire nuovi tipi basati sui normali tipi di dato SQL, permettendo alla base di dati stessa di comprendere dati complessi. Per esempio, si può definire un indirizzo come un insieme di diverse stringhe di testo per rappresentare il numero civico, la città, ecc. Da qui in poi si possono creare facilmente tabelle che contengono tutti i campi necessari a memorizzare un indirizzo con una sola linea di codice.

### MSSQL

Microsoft SQL Server è un RDBM(Relational Databse Management). Sia Microsoft SQL Server sia Sybase Adaptive Server Enterprise comunicano sulla rete utilizzando un protocollo di livello di applicazione chiamato "Tabular Data Stream" (TDS). SQL Server supporta anche "Open Database Connectivity" (ODBC). Esso utilizza una variante del linguaggio SQL chiamato T-SQL (Transact SQL).
Questo DBMS ha riscosso notorietá in ambienti enterprise e PA siccome fa della replica e distribuzione il suo punto forte, inoltre, essendo prodotto dalla casa di Redmond, è profondamente legato alle distribuzioni di Windows Server, molto apprezzate dai sistemisti delle grandi aziende per la familiarità con la relativa versione desktop e per la semplicità d'uso e manutenzione relativamente ai sistemi POSIX e Linux.

### Oracle
Oracle Database è uno tra i più famosi software di database management system sviluppato da Oracle Corporation. Scritto in linguaggio C, che fa parte dei cosiddetti RDBMS ovvero di sistemi di database basati sul modello relazionale affermatosi come standard di riferimento dei database dell'ultimo decennio. Come MSSQL ha avuto particolare successo in ambito enterprise, di fatti è il database utilizzato per i sistemi informatici di UNIGE, in particolare per la semplicita con cui è possibile configurare la replica del sistema e la distribuzione su piu nodi.

### Mysql
MySQL Database Service è un servizio di database completamente gestito per distribuire applicazioni native del cloud utilizzando il database open source più diffuso al mondo. È sviluppato, gestito e supportato al 100% dal Team MySQL.
Ad oggi è tra i database relazionali piu popolari al mondo e il go-to per le applicazioni php, data la semplicita di utilizzo della libreria mysqli integrata nel pacchetto php rilasciato sulla maggior parte delle release linux.
Nel 2009, dopo l'acquisto da parte di Oracle di Sun Microsystem, il team di sviluppo originale di MySQL, a causa di dissapori con Oracle ha deciso di lasciare il progetto e di dedicarsi ad un fork del progetto oggi noto come MariaDB che porta numerose ottimizzazioni rispetto al progetto originale.
Siccome oracle concentra le sue risorse sulla sua soluzione commerciale, Oracle DB, questo database si ritrova in una terra di mezzo, da una parte lodato per la semplicità d'uso e dall'altra poco supportadato dall'azienda di appartenenza.

<br><br>

## Perché PostgreSQL?

Abbiamo optato per questo database per diversi motivi:

- È completamente gratuito e sopratutto open-source
- È tra i DBMS più diffusi ed utilizzati
- Ha una documentazione online molto curata e supportata dalla community
- Rispetto ad esempio a MySQL, è completamente ACID compliant
- Nonostante sia tendenzialmente meno veloce rispetto a MySQL, è più efficiente nell'esecuzione di query complesse
- È piuttosto semplice da imparare rispetto ad altri, ad esempio Oracle DB
- Supporta numerosi data types, non sempre presenti in altri sistemi (come ad esempio timezone-aware timestamps, UUID e JSON)
- È quello che personalmente conosciamo meglio, in quanto lo utilizziamo quotidianamente si per lo sviluppo di progetti personali che per progetti lavorativi.

<br><br>


### PostgreSQL vs MSSQL

Una delle ragioni che ci ha spinto ad utilizzare PostgresSQL piuttosto che MSSQL è la sintassi che ci risultava essere più comoda per come siamo abituati a programmare(parlando in termini di linguaggio di programmazione ecc…). Anche la differenza tra i tipi presenti nei due DB ha giocato un ruolo fondamentale nella scelta, infatti i tipi presenti su PostgreSQL sono più “intuitivi”.

PostgreSQL vs Oracle DB

Differenza tra postgres e oracle:
La prima differenza che viene sicuramente in mente pensando ad una differenza tra postgres e oracle è che PostgreSQL è un database open source, mentre oracle è un sistema più “chiuso”. Entrambi hanno un’alta availability, ma ciò che ci ha spinti verso PostgreSQL sono sicuramente la sua maggiore scalabilità(essendo open source) rispetto a Oracle, le soluzioni di storage cluster-based che permettono un espansione gratuita e e supporta le SSL native che assistono le comunicazioni criptate.


PostgreSQL vs MySQL

PostgreSQL, come già detto, è un database object-relational mentre Mysql è puramente relazionale. Questo significa che PostgreSQL include caratteristiche come table inheritance e funzioni di overloading, che può essere importante per certe applicazioni. Postgres ,inoltre, aderisce ad uno standard più vicino a quello di SQL.
Postgres gestisce la concorrenza meglio rispetto a Mysql per diverse ragioni, per esempio perché implementa la Multiversion Concurrency Control(MVCC) che può creare indici parziali(per esempio se si ha un modello con cancellazioni “soft”, puoi creare un indice che ignora i record segnati come cancellati (deleted)).
Postgres è conosciuto per proteggere l’integrità dei dati a livello di trasizione. Questo lo rende meno vulnerabile alla corruzione dei dati.






