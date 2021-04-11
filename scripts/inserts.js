const fs = require('fs');
const {
  chunk,
  flatten,
  isString,
  random,
  range,
  sample,
  startCase,
  uniq
} = require('lodash');
const { left, right, regions } = require('./inserts/data.json');



const NO_TRAINERS = 100000;
const NO_POKEMON_TRAINER = 1000000;
const NO_BATTLES = 10000000;
const NO_GYM = 100000;
const NO_TRAINER_GYM = 5000000;

const CHUNK_SIZE = 100;



function randDate() {
  return (new Date(random(1940, 2020), random(12), random(1, 31))).toISOString();
}

function buildInsertStatement(fields, tableName, elements) {
  let sql = elements.map(el => {
    const tupla = fields.map(f => {
      if (!el[f]) return 'NULL';
      return isString(el[f]) ? `'${el[f]}'` : el[f];
    }).join(', ');
    return `\t(${tupla})`;
  }).join(',\n');
  return `INSERT INTO ${tableName} (${fields.join(', ')}) \nVALUES \n ${sql};`;
}

async function makeInsert(fileIndex, tableName, elements) {
  console.log(`Creating table ${tableName}`);
  const fields = Object.keys(elements[0]);

  let insert = `SET search_path TO pokedex;\n\n`;
  insert += chunk(elements, CHUNK_SIZE)
    .map(chunk => buildInsertStatement(fields, tableName, chunk))
    .join('\n\n');

  fs.writeFileSync(`./sql/2.${fileIndex}_insert_${tableName}.sql`, insert);
}



async function generatePokemons() {
  console.log(`Generating pokemons`);
  // poke.forEach(p => {
  //   pokemons.push(cleanPokemon(p));
  //    if (p.forms) pokemons.push(...p.forms.map(pp => cleanPokemon(pp)));
  // })
  const pokemons = require('./inserts/pokemons.json').map(p => ({
    id: p.id,
    name: p.name,
    primary_type: p.types[0],
    secondary_type: p.types[1],
  }));
  makeInsert(0, 'pokemons', pokemons);
  return pokemons;
}

async function generateTrainers() {
  console.log(`Generating trainers`);
  const trainers = range(NO_TRAINERS).map(i => ({
    id: i + 1,
    first_name: startCase(sample(left)),
    last_name: startCase(sample(right)),
    birth_date: randDate(),
    gender: Math.random() > 0.5 ? 'F' : 'M',
    birth_country: sample(regions),
    is_gym_leader: Math.random() > 0.9
  }));
  makeInsert(1, 'trainers', trainers);
  return;
}

async function generatePokeTrainers(pokemons) {
  console.log(`Generating pokemon_trainer`);
  const pokeTrainers = range(NO_POKEMON_TRAINER).map(i => ({
    id: i + 1,
    pokemon_id: sample(pokemons).id,
    trainer_id: random(1, NO_TRAINERS),
    nickname: '',
    gender: Math.random() > 0.5 ? 'F' : 'M',
    level: random(1, 100),
    catch_date: randDate(),
  }));
  makeInsert(2, 'pokemon_trainer', pokeTrainers);
  return pokeTrainers;
}

async function generateBattles() {
  console.log(`Generating battles`);
  const battles = range(NO_BATTLES).map(i => ({
    id: i + 1,
    first_trainer_id: random(1, NO_TRAINERS),
    second_trainer_id: random(1, NO_TRAINERS),
    battle_date: randDate(),
  }));
  makeInsert(3, 'battles', battles);
  return battles;
}

async function generateGyms(trainers) {
  console.log(`Generating gyms`);
  const pokeTypes = uniq(flatten(require('./inserts/pokemons.json').map(p => p.types)));
  const gyms = range(NO_GYM).map(i => ({
    id: i + 1,
    region: sample(regions),
    type: sample(pokeTypes),
    medal_name: sample(right),
    gym_leader: sample(trainers.filter(t => t.is_gym_leader)).id,
  }));
  makeInsert(4, 'gyms', gyms);
  return gyms;
}

async function generateTrainerGym() {
  console.log(`Generating trainer_gym`);
  const trainer_gym = range(NO_TRAINER_GYM).map(i => ({
    trainer_id: random(1, NO_TRAINERS),
    gym_id: random(1, NO_GYM),
    last_attempt: randDate(),
    has_won: Math.random() > 0.5,
  }));
  makeInsert(5, 'trainer_gym', trainer_gym);
}


async function main() {
  const pokemons = await generatePokemons();
  const trainers = await generateTrainers();
  generatePokeTrainers(pokemons);
  generateBattles();
  generateGyms(trainers);
  generateTrainerGym();
} 

main();