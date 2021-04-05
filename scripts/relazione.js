const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const { mdToPdf } = require('md-to-pdf');

const srcPath = './docs/';

function runQuery(query) {
  // const command = `docker-compose exec postgres psql -U postgres -P pager=off -c '${query}'`;
  // const command = `docker-compose`;
  console.log(process.cwd());
  return childProcess.spawnSync('docker-compose',
    ['exec', '-T', 'postgres', 'psql', '-U', 'postgres', '-P', 'pager=off', '-H', '-c', query],
    { env: process.env, cwd: process.cwd() }
  );
}


const files = fs.readdirSync(srcPath).map(f => path.join(srcPath, f));
let md = files.map(f => fs.readFileSync(f).toString()).join('\n\n');

md = md.replace(/^@query\((.+)\)$/gm, function (match, p1) {
  return runQuery(p1).stdout.toString();
}).replace(/^@file\((.+)\)$/gm, function (match, p1) {
  return fs.readFileSync(p1).toString();
})

// console.log(md)

// console.log(files);

// markdownpdf().from.string(md).to("./relazione.pdf", function () {
//   console.log("Fatto!");
// })

mdToPdf({ content: md }, { dest: './relazione.pdf' });