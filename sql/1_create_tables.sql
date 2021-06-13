SET search_path TO pokedex;

create table pokemons
(
    -- id             serial not null,
    name           varchar(255),
    primary_type   varchar(255),
    secondary_type varchar(255),
    sprite         TEXT
);

create table trainers
(
    username      varchar(255),
    first_name    varchar(255),
    last_name     varchar(255),
    birth_date    timestamp,
    gender        char,
    birth_country varchar(255),
    is_gym_leader boolean
);

create table pokemon_trainer
(
    pokemon       varchar(255),
    trainer       varchar(255),
    nickname      varchar(255),
    gender        char,
    level         integer,
    catch_date    timestamp
);

create table battles
(
    first_trainer  varchar(255),
    second_trainer varchar(255),
    battle_date    timestamp,
    win            boolean
);

create table gyms
(
    name       varchar(255),
    region     varchar(255),
    type       varchar(255),
    medal_name varchar(255),
    gym_leader varchar(255)
);

create table trainer_gym
(
    trainer      varchar(255),
    gym          varchar(255),
    attempt_date timestamp,
    has_won      boolean
);