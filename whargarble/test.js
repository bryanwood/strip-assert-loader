var parse = require("babylon").parse;
var generate = require("babel-generator").default;
var traverse = require("babel-traverse").default;
var t = require("babel-types");
var fs = require("fs");
var source = fs.readFileSync("./source.js", "utf8");

var ast = parse(source, { sourceType: "module" });

var visitor = require('../lib/visitor');

visitor(ast);


var output = generate(ast);
console.log("");
console.log(output.code);
