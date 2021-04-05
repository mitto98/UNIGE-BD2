const fs = require('fs');
const path = require('path');
const markdownpdf = require("markdown-pdf");

const srcPath = './docs/';
const files = fs.readdirSync(srcPath).map(f => path.join(srcPath, f));

const md = files.map(f => fs.readFileSync(f).toString()).join('\n\n');

console.log(files);

markdownpdf().from.string(md).to("./relazione.pdf", function () {
  console.log("Fatto!");
})