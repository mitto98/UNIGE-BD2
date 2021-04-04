const fs = require('fs');
const {
  flatten,
  isString,
  random,
  range,
  sample,
  startCase,
  uniq
} = require('lodash');

const NO_TRAINERS = 1000;
const NO_POKEMON_TRAINER = 1000;
const NO_BATTLES = 10000;
const NO_GYM = 1000;
const NO_TRAINER_GYM = 10000;

let left = ['admiring', 'adoring', 'affectionate', 'agitated', 'amazing', 'angry', 'awesome', 'blissful', 'boring', 'brave', 'clever', 'cocky', 'compassionate', 'competent', 'condescending', 'confident', 'cranky', 'dazzling', 'determined', 'distracted', 'dreamy', 'eager', 'ecstatic', 'elastic', 'elated', 'elegant', 'eloquent', 'epic', 'fervent', 'festive', 'flamboyant', 'focused', 'friendly', 'frosty', 'gallant', 'gifted', 'goofy', 'gracious', 'happy', 'hardcore', 'heuristic', 'hopeful', 'hungry', 'infallible', 'inspiring', 'jolly', 'jovial', 'keen', 'kind', 'laughing', 'loving', 'lucid', 'mystifying', 'modest', 'musing', 'naughty', 'nervous', 'nifty', 'nostalgic', 'objective', 'optimistic', 'peaceful', 'pedantic', 'pensive', 'practical', 'priceless', 'quirky', 'quizzical', 'relaxed', 'reverent', 'romantic', 'sad', 'serene', 'sharp', 'silly', 'sleepy', 'stoic', 'stupefied', 'suspicious', 'tender', 'thirsty', 'trusting', 'unruffled', 'upbeat', 'vibrant', 'vigilant', 'vigorous', 'wizardly', 'wonderful', 'xenodochial', 'youthful', 'zealous', 'zen'];
let right = ['albattani', 'allen', 'almeida', 'agnesi', 'archimedes', 'ardinghelli', 'aryabhata', 'austin', 'babbage', 'banach', 'bardeen', 'bartik', 'bassi', 'beaver', 'bell', 'benz', 'bhabha', 'bhaskara', 'blackwell', 'bohr', 'booth', 'borg', 'bose', 'boyd', 'brahmagupta', 'brattain', 'brown', 'carson', 'chandrasekhar', 'shannon', 'clarke', 'colden', 'cori', 'cray', 'curran', 'curie', 'darwin', 'davinci', 'dijkstra', 'dubinsky', 'easley', 'edison', 'einstein', 'elion', 'engelbart', 'euclid', 'euler', 'fermat', 'fermi', 'feynman', 'franklin', 'galileo', 'gates', 'goldberg', 'goldstine', 'goldwasser', 'golick', 'goodall', 'haibt', 'hamilton', 'hawking', 'heisenberg', 'hermann', 'heyrovsky', 'hodgkin', 'hoover', 'hopper', 'hugle', 'hypatia', 'jackson', 'jang', 'jennings', 'jepsen', 'johnson', 'joliot', 'jones', 'kalam', 'kare', 'keller', 'kepler', 'khorana', 'kilby', 'kirch', 'knuth', 'kowalevski', 'lalande', 'lamarr', 'lamport', 'leakey', 'leavitt', 'lewin', 'lichterman', 'liskov', 'lovelace', 'lumiere', 'mahavira', 'mayer', 'mccarthy', 'mcclintock', 'mclean', 'mcnulty', 'meitner', 'meninsky', 'mestorf', 'minsky', 'mirzakhani', 'morse', 'murdock', 'neumann', 'newton', 'nightingale', 'nobel', 'noether', 'northcutt', 'noyce', 'panini', 'pare', 'pasteur', 'payne', 'perlman', 'pike', 'poincare', 'poitras', 'ptolemy', 'raman', 'ramanujan', 'ride', 'montalcini', 'ritchie', 'roentgen', 'rosalind', 'saha', 'sammet', 'shaw', 'shirley', 'shockley', 'sinoussi', 'snyder', 'spence', 'stallman', 'stonebraker', 'swanson', 'swartz', 'swirles', 'tesla', 'thompson', 'torvalds', 'turing', 'varahamihira', 'visvesvaraya', 'volhard', 'wescoff', 'wiles', 'williams', 'wilson', 'wing', 'wozniak', 'wright', 'yalow', 'yonath'];
let regions = ['Kanto', 'Settipelago', 'Johto', 'Hoenn', 'Sinnoh', 'Unima', 'Kalos', 'Alola', 'Galar', 'Auros', 'Fiore', 'Almia', 'Oblivia', 'Ransei'];

function randDate() {
  return (new Date(random(1940, 2020), random(12), random(1, 31))).toISOString();
}

function makeInsert(fileIndex, tableName, elements) {
  const fields = Object.keys(elements[0]);

  let sql = elements.map(el => {
    const tupla = fields.map(f => {
      if (!el[f]) return 'NULL';
      return isString(el[f]) ? `'${el[f]}'` : el[f];
    }).join(', ');
    return `\t(${tupla})`;
  }).join(',\n');
  let insert = `SET search_path TO pokedex;\n\n`;
  insert += `INSERT INTO ${tableName} (${fields.join(', ')}) \nVALUES \n ${sql};`;

  fs.writeFileSync(`./sql/2.${fileIndex}_insert_${tableName}.sql`, insert);
}

// poke.forEach(p => {
//   pokemons.push(cleanPokemon(p));
//    if (p.forms) pokemons.push(...p.forms.map(pp => cleanPokemon(pp)));
// })
const pokemons = require('./pokemons.json').map(p => ({
  id: p.id,
  name: p.name,
  primary_type: p.types[0],
  secondary_type: p.types[1],
}));
makeInsert(0, 'pokemons', pokemons);



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



const pokeTrainers = range(NO_POKEMON_TRAINER).map(i => ({
  pokemon_id: sample(pokemons).id,
  trainer_id: sample(trainers).id,
  nickname: '',
  gender: Math.random() > 0.5 ? 'F' : 'M',
  level: random(1, 100),
  catch_date: randDate(),
}));
makeInsert(2, 'pokemon_trainer', pokeTrainers);



const battles = range(NO_BATTLES).map(i => ({
  id: i + 1,
  first_trainer_id: sample(trainers).id,
  second_trainer_id: sample(trainers).id,
  battle_date: randDate(),
}));
makeInsert(3, 'battles', battles);



const pokeTypes = uniq(flatten(require('./pokemons.json').map(p => p.types)));
const gyms = range(NO_GYM).map(i => ({
  id: i + 1,
  region: sample(regions),
  type: sample(pokeTypes),
  medal_name: sample(right),
  gym_leader: sample(trainers.filter(t => t.is_gym_leader)).id,
}));
makeInsert(4, 'gyms', gyms);



const trainer_gym = range(NO_TRAINER_GYM).map(i => ({
  trainer_id: sample(trainers).id,
  gym_id: sample(gyms).id,
  last_attempt: randDate(),
  has_won: Math.random() > 0.5,
}));
makeInsert(5, 'trainer_gym', trainer_gym);