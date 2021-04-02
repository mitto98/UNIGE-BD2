create table pokemons
(
    id             serial not null,
    name           varchar(255),
    primary_type   varchar(255),
    secondary_type varchar(255)
);

alter table pokemons
    owner to postgres;

create table trainers
(
    id            serial not null,
    first_name    varchar(255),
    last_name     varchar(255),
    birth_date    timestamp,
    gender        char,
    birth_country varchar(255)
);

alter table trainers
    owner to postgres;

create table pokemon_trainer
(
    pokemon_id    integer,
    trainer_id    integer,
    is_gym_leader boolean,
    nickname      varchar(255),
    gender        char,
    level         integer,
    catch_date    timestamp
);

alter table pokemon_trainer
    owner to postgres;

create table battles
(
    id                serial not null,
    first_trainer_id  integer,
    second_trainer_id integer,
    battle_date       timestamp
);

alter table battles
    owner to postgres;

create table gyms
(
    id         serial not null,
    region     varchar(255),
    type       varchar(255),
    medal_name varchar(255),
    gym_leader integer
);

alter table gyms
    owner to postgres;

create table trainer_gym
(
    trainer_id   integer,
    gym_id       integer,
    last_attempt timestamp,
    has_won      boolean
);

alter table trainer_gym
    owner to postgres;

