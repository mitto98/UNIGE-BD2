const fs = require("fs");
const Path = require("path");
const {
  chunk,
  flatten,
  isString,
  random,
  range,
  sample,
  startCase,
  uniq,
} = require("lodash");
const { left, right, regions } = require("./inserts/data.json");
const pokeTypes = uniq(
  flatten(require("./inserts/pokemons.json").map((p) => p.types))
);

const NO_POKEMON = 15000;
const NO_TRAINERS = 150000;
const NO_POKEMON_TRAINER = 100000;
const NO_BATTLES = 100000;
const NO_GYM = 20000;
const NO_TRAINER_GYM = 25000;

const CHUNK_SIZE = 1000;

function randDate() {
  return new Date(random(1940, 2020), random(12), random(1, 31)).toISOString();
}

function buildInsertStatement(fields, tableName, elements) {
  let sql = elements
    .map((el) => {
      const tupla = fields
        .map((f) => {
          if (!el[f] && el[f] !== false) return "NULL";
          return isString(el[f]) ? `'${el[f]}'` : el[f];
        })
        .join(", ");
      return `\t(${tupla})`;
    })
    .join(",\n");
  return `INSERT INTO ${tableName} (${fields.join(", ")}) \nVALUES \n ${sql};`;
}

function makeInsert(fileIndex, tableName, elements) {
  const filename = `./sql/2.${fileIndex}_insert_${tableName}.sql`;

  const stream = fs.createWriteStream(filename);

  console.log(`Creating table ${tableName}`);
  const fields = Object.keys(elements[0]);

  stream.write(`SET search_path TO pokedex;\n\n`);
  chunk(elements, CHUNK_SIZE).forEach((chunk) => {
    const insert = buildInsertStatement(fields, tableName, chunk);
    stream.write(insert);
  });
  stream.end();
}

function generatePokemons() {
  function getSpriteBase64(pokeId) {
    const file = Path.join(
      process.cwd(),
      "scripts/inserts/sprites",
      `${pokeId}.png`
    );
    var bitmap = fs.readFileSync(file);
    return Buffer.from(bitmap).toString("base64");
  }

  console.log(`Generating pokemons`);
  const pokemons = require("./inserts/pokemons.json").map((p) => ({
    // id: p.id,
    name: p.name,
    primary_type: p.types[0],
    secondary_type: p.types[1],
    sprite: getSpriteBase64(p.id),
  }));

  range(NO_POKEMON - pokemons.length).forEach((i) => {
    pokemons.push({
      // id: pokemons.length + 1 + i,
      name: `Missingno ${i + 1}`,
      primary_type: null,
      secondary_type: null,
      sprite: getSpriteBase64("missingno"),
    });
  });

  chunk(pokemons, 6000).forEach((pokes, i) => {
    makeInsert(`0.${i}`, "pokemons", pokes);
  });
  return pokemons;
}

function generateTrainers() {
  console.log(`Generating trainers`);
  const trainers = range(NO_TRAINERS).map((i) => ({
    username: `trainer_${i}`,
    first_name: startCase(sample(left)),
    last_name: startCase(sample(right)),
    birth_date: randDate(),
    gender: Math.random() > 0.5 ? "F" : "M",
    birth_country: sample(regions),
    is_gym_leader: Math.random() > 0.9,
  }));
  makeInsert(1, "trainers", trainers);
  return trainers;
}

function generatePokeTrainers(pokemons, trainers) {
  console.log(`Generating pokemon_trainer`);
  const pokeTrainers = range(NO_POKEMON_TRAINER).map((i) => ({
    pokemon: sample(pokemons).name,
    trainer: sample(trainers).username,
    nickname: "",
    gender: Math.random() > 0.5 ? "F" : "M",
    level: random(1, 100),
    catch_date: randDate(),
  }));
  makeInsert(2, "pokemon_trainer", pokeTrainers);
  return pokeTrainers;
}

function generateBattles(trainers) {
  console.log(`Generating battles`);
  const battles = range(NO_BATTLES).map((i) => ({
    first_trainer: sample(trainers).username,
    second_trainer: sample(trainers).username,
    battle_date: randDate(),
    win: !!(Math.random() > 0.5),
  }));
  makeInsert(3, "battles", battles);
  return battles;
}

function generateGyms(trainers) {
  console.log(`Generating gyms`);
  const gyms = range(NO_GYM).map((i) => ({
    name: `gym_${i}`,
    region: sample(regions),
    type: sample(pokeTypes),
    medal_name: sample(right),
    gym_leader: sample(trainers.filter((t) => t.is_gym_leader)).username,
  }));
  makeInsert(4, "gyms", gyms);
  return gyms;
}

function generateTrainerGym(trainers, gyms) {
  console.log(`Generating trainer_gym`);
  const trainer_gym = range(NO_TRAINER_GYM).map((i) => ({
    trainer: sample(trainers).username,
    gym: sample(gyms).name,
    attempt_date: randDate(),
    has_won: Math.random() > 0.5,
  }));
  makeInsert(5, "trainer_gym", trainer_gym);
  return trainer_gym;
}

const pokemons = generatePokemons();
const trainers = generateTrainers();
generatePokeTrainers(pokemons, trainers);
generateBattles(trainers);
const gyms = generateGyms(trainers);
generateTrainerGym(trainers, gyms);
