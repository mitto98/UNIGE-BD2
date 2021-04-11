SET search_path TO pokedex;

create table pokemons
(
    id             serial not null,
    name           varchar(255),
    primary_type   varchar(255),
    secondary_type varchar(255)
);

create table trainers
(
    id            serial not null,
    first_name    varchar(255),
    last_name     varchar(255),
    birth_date    timestamp,
    gender        char,
    birth_country varchar(255),
    is_gym_leader boolean
);

create table pokemon_trainer
(
    id             serial not null,
    pokemon_id    integer,
    trainer_id    integer,
    nickname      varchar(255),
    gender        char,
    level         integer,
    catch_date    timestamp
);

create table battles
(
    id                serial not null,
    first_trainer_id  integer,
    second_trainer_id integer,
    battle_date       timestamp
);

create table gyms
(
    id         serial not null,
    region     varchar(255),
    type       varchar(255),
    medal_name varchar(255),
    gym_leader integer
);

create table trainer_gym
(
    trainer_id   integer,
    gym_id       integer,
    last_attempt timestamp,
    has_won      boolean
);