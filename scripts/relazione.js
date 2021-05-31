const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const { mdToPdf } = require("md-to-pdf");

/** CONFIG **/
const srcPath = "./docs/";
const destName = "./Relazione_BD2_Dainelli_Dapino.pdf";
/** END CONFIG **/

const workdir = path.join(process.cwd(), srcPath);

function restartDb() {
  childProcess.spawnSync("docker-compose", ["down"], {
    env: process.env,
    cwd: process.cwd(),
  });
  childProcess.spawnSync("docker-compose", ["up", "-d"], {
    env: process.env,
    cwd: process.cwd(),
  });
  childProcess.spawnSync("sleep", ["2"]);
}

function runQuery(query) {
  console.log("Running", query);
  return childProcess.spawnSync(
    "docker-compose",
    [
      "exec",
      "-T",
      "postgres",
      "psql",
      "-U",
      "postgres",
      "-P",
      "pager=off",
      "-H",
      "-c",
      query,
    ],
    { env: process.env, cwd: process.cwd() }
  );
}

function processString({ file, md }) {
  console.log("Started ", file);
  const res = md
    .replace(/^@query\((.+)\)$/gm, function (match, p1) {
      return runQuery(p1).stdout.toString();
    })
    .replace(/^@runQuery\((.+)\)$/gm, function (match, p1) {
      console.log(runQuery(p1).stdout.toString());
      return "";
    })
    .replace(/^@queryFile\((.+)\)$/gm, function (match, p1) {
      const filePath = path.join(workdir, p1);
      const query = fs.readFileSync(filePath).toString();
      return runQuery(query).stdout.toString();
    })
    .replace(/^@qiFile\((.+)\)$/gm, function (match, p1) {
      restartDb();
      const filePath = path.join(workdir, p1);
      const query = "EXPLAIN ANALYZE " + fs.readFileSync(filePath).toString();
      return runQuery(query).stdout.toString();
    })
    .replace(/^@runQueryFile\((.+)\)$/gm, function (match, p1) {
      const filePath = path.join(workdir, p1);
      const query = fs.readFileSync(filePath).toString();
      console.log(runQuery(query).stdout.toString());
      return "";
    })
    .replace(/^@file\((.+)\)$/gm, function (match, p1) {
      const filePath = path.join(workdir, p1);
      return fs.readFileSync(filePath).toString();
    });
  console.log("Finished ", file);

  return res;
}

(async function () {
  const start = new Date();

  const md = fs
    .readdirSync(workdir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      return {
        file: f,
        md: fs.readFileSync(path.join(workdir, f)).toString(),
      };
    })
    .map(processString)
    .join("\n\n");

  mdToPdf(
    { content: md },
    {
      dest: destName,
      basedir: workdir,
      // as_html: true,
      css: "table td { padding: 0 !important; }",
    }
  );

  const end = new Date();
  const diff = Math.round((end - start) / 1000);
  console.log(`Terminato in ${Math.round(diff / 60)}m ${diff % 60}s`);
})();
