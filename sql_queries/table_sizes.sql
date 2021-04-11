SELECT relname                                         AS "table",
       reltuples                                       AS "no_tuple",
       relpages                                        AS "no_pages",
       pg_size_pretty(pg_relation_size(c.oid, 'main')) AS "table_size"
FROM pg_class c
         LEFT JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE relkind = 'r'
  AND nspname = 'pokedex';