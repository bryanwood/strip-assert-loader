var parse = require("babylon").parse;
var generate = require("babel-generator").default;
var traverse = require("babel-traverse").default;
var t = require("babel-types");
var visitor = require("./visitor");

module.exports = function(source) {
  if (process.env.NODE_ENV === "production") {
    var ast = parse(source, { sourceType: "module" });
    visitor(ast);

    var output = generate(ast);
    return output.code;
  }
  return source;
};
