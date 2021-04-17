# DB2

Pokemon (id, name, primary_type, secondary_type)

Allenatore (id, nome, cognome, data_nasciata, sesso, regione_provenienza)

pokemon_allenatore (pokemno_id, allenatore_id, is_capopalestra, soprannome, sesso, livello, data_acquisizione)

incontro(id, allenatore_id, sfidante_id, )

allenatore_palestra(allenatore_id, palestra_id, data, is_vittoria, seriale_medaglia)

## Indici

Indice denso (clusterizzato e non) + rapido, costoso aggiornamento
Indice sparso 

Indice singolo livello e multi-livello, se indice è grosso, ha senso creare un indice sparso per l'indice (annidato a n livelli)