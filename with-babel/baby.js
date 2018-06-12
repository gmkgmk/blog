const babylon = require("babylon");
const traverse = require("babel-traverse").default;
var babel = require('babel-core');
var t = require('babel-types');

const code = `let tips = [
    "Click on any AST node with a '+' to expand it",
  
    "Hovering over a node highlights the ",
     "corresponding part in the source code",
  
    "Shift click on an AST node expands the whole substree"
  ];`;

function printTips() {
    tips.forEach((tip, i) => console.log(`Tip ${i}:` + tip));
}


const result = babel.transform(printTips, {
    plugins: [
        [require("./babel-pre"),
        {
            spec: "$",
            func: true,
            var: true
        }]
    ]
});

console.log(result.code)