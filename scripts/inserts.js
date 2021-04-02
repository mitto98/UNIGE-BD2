const fs = require('fs');
const { range, random } = require('lodash');
const pokemons = require('./pokemons.json');

const NO_TRAINERS = 1000;

const cleanPokemon = p => ({
  id: p.id,
  name: p.name,
  primary_type: p.types[0],
  secondary_type: p.types[1],
});

function makeInsert(table, fields, elements) {
  let sql = elements.map(i => `\t(${fields.map(f => `'${i[f]}'`).join(', ')})`).join(',\n');
  return `INSERT INTO ${table} (${fields.map(f => `'${f}'`).join(', ')}) \nVALUES \n ${sql};`;
}

// poke.forEach(p => {
//   pokemons.push(cleanPokemon(p));
//    if (p.forms) pokemons.push(...p.forms.map(pp => cleanPokemon(pp)));
// })

fs.writeFileSync('./sql/2-Insert_pokemons.sql', makeInsert(
  'pokemons',
  ['id', 'name', 'primary_type', 'secondary_type'],
  pokemons.map(p => cleanPokemon(p))
));



let left = ['admiring', 'adoring', 'affectionate', 'agitated', 'amazing', 'angry', 'awesome', 'blissful', 'boring', 'brave', 'clever', 'cocky', 'compassionate', 'competent', 'condescending', 'confident', 'cranky', 'dazzling', 'determined', 'distracted', 'dreamy', 'eager', 'ecstatic', 'elastic', 'elated', 'elegant', 'eloquent', 'epic', 'fervent', 'festive', 'flamboyant', 'focused', 'friendly', 'frosty', 'gallant', 'gifted', 'goofy', 'gracious', 'happy', 'hardcore', 'heuristic', 'hopeful', 'hungry', 'infallible', 'inspiring', 'jolly', 'jovial', 'keen', 'kind', 'laughing', 'loving', 'lucid', 'mystifying', 'modest', 'musing', 'naughty', 'nervous', 'nifty', 'nostalgic', 'objective', 'optimistic', 'peaceful', 'pedantic', 'pensive', 'practical', 'priceless', 'quirky', 'quizzical', 'relaxed', 'reverent', 'romantic', 'sad', 'serene', 'sharp', 'silly', 'sleepy', 'stoic', 'stupefied', 'suspicious', 'tender', 'thirsty', 'trusting', 'unruffled', 'upbeat', 'vibrant', 'vigilant', 'vigorous', 'wizardly', 'wonderful', 'xenodochial', 'youthful', 'zealous', 'zen'];
let right = ['albattani', 'allen', 'almeida', 'agnesi', 'archimedes', 'ardinghelli', 'aryabhata', 'austin', 'babbage', 'banach', 'bardeen', 'bartik', 'bassi', 'beaver', 'bell', 'benz', 'bhabha', 'bhaskara', 'blackwell', 'bohr', 'booth', 'borg', 'bose', 'boyd', 'brahmagupta', 'brattain', 'brown', 'carson', 'chandrasekhar', 'shannon', 'clarke', 'colden', 'cori', 'cray', 'curran', 'curie', 'darwin', 'davinci', 'dijkstra', 'dubinsky', 'easley', 'edison', 'einstein', 'elion', 'engelbart', 'euclid', 'euler', 'fermat', 'fermi', 'feynman', 'franklin', 'galileo', 'gates', 'goldberg', 'goldstine', 'goldwasser', 'golick', 'goodall', 'haibt', 'hamilton', 'hawking', 'heisenberg', 'hermann', 'heyrovsky', 'hodgkin', 'hoover', 'hopper', 'hugle', 'hypatia', 'jackson', 'jang', 'jennings', 'jepsen', 'johnson', 'joliot', 'jones', 'kalam', 'kare', 'keller', 'kepler', 'khorana', 'kilby', 'kirch', 'knuth', 'kowalevski', 'lalande', 'lamarr', 'lamport', 'leakey', 'leavitt', 'lewin', 'lichterman', 'liskov', 'lovelace', 'lumiere', 'mahavira', 'mayer', 'mccarthy', 'mcclintock', 'mclean', 'mcnulty', 'meitner', 'meninsky', 'mestorf', 'minsky', 'mirzakhani', 'morse', 'murdock', 'neumann', 'newton', 'nightingale', 'nobel', 'noether', 'northcutt', 'noyce', 'panini', 'pare', 'pasteur', 'payne', 'perlman', 'pike', 'poincare', 'poitras', 'ptolemy', 'raman', 'ramanujan', 'ride', 'montalcini', 'ritchie', 'roentgen', 'rosalind', 'saha', 'sammet', 'shaw', 'shirley', 'shockley', 'sinoussi', 'snyder', 'spence', 'stallman', 'stonebraker', 'swanson', 'swartz', 'swirles', 'tesla', 'thompson', 'torvalds', 'turing', 'varahamihira', 'visvesvaraya', 'volhard', 'wescoff', 'wiles', 'williams', 'wilson', 'wing', 'wozniak', 'wright', 'yalow', 'yonath'];

const trainers = range(NO_TRAINERS).map(i => ({
  id: i + 1,
  nome: left[random(left.length)],
  cognome: right[random(right.length)],
}));

fs.writeFileSync('./sql/2-Insert_trainers.sql', makeInsert(
  'trainers',
  ['id', 'nome', 'cognome'],
  trainers
));