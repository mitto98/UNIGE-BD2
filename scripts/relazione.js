const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const { mdToPdf } = require('md-to-pdf');


/** CONFIG **/
const srcPath = './docs/';
const destName = './Relazione_BD2_Dainelli_Dapino.pdf';
/** END CONFIG **/


const workdir = path.join(process.cwd(), srcPath);


function runQuery(query) {
  return childProcess.spawnSync('docker-compose',
    ['exec', '-T', 'postgres', 'psql', '-U', 'postgres', '-P', 'pager=off', '-H', '-c', query],
    { env: process.env, cwd: process.cwd() }
  );
}


const files = fs.readdirSync(workdir)
  .filter(f => f.endsWith('.md'))
  .map(f => path.join(workdir, f));
let md = files.map(f => fs.readFileSync(f).toString()).join('\n\n');

md = md.replace(/^@query\((.+)\)$/gm, function (match, p1) {
  return runQuery(p1).stdout.toString();
}).replace(/^@queryFile\((.+)\)$/gm, function (match, p1) {
  const filePath = path.join(workdir, p1);
  const query = fs.readFileSync(filePath).toString();
  return runQuery(query).stdout.toString();
}).replace(/^@file\((.+)\)$/gm, function (match, p1) {
  const filePath = path.join(workdir, p1);
  return fs.readFileSync(filePath).toString();
})

mdToPdf({ content: md }, { 
  dest: destName,
  basedir: workdir
});