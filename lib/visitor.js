var traverse = require("babel-traverse").default;
var t = require("babel-types");

module.exports = visitor;

function visitor(ast) {
  var assertImportNames = [];
  function assertVisitor() {
    return {
      AssignmentExpression(path, state) {
        if (
          assertImportNames.map(x => x.name).indexOf(path.node.left.name) !== -1
        ) {
          assertImportNames = assertImportNames.filter(
            x => x.name !== path.node.left.name
          );
        }
      },
      ImportDeclaration(path, state) {
        if (path.node.source.value === "assert") {
          var name = path.node.specifiers[0].local.name;
          var bindingPath = path.scope.getBinding(name).path;
          assertImportNames.push({
            type: "import",
            name,
            path: bindingPath
          });
          path.remove();
        }
      },
      CallExpression(path, state) {
        if (
          path.node.callee.name === "require" &&
          path.node.arguments &&
          path.node.arguments.length === 1 &&
          t.isStringLiteral(path.node.arguments[0])
        ) {
          if (
            path.parent &&
            t.isVariableDeclarator(path.parent) &&
            t.isIdentifier(path.parent.id)
          ) {
            var name = path.parent.id.name;
            var bindingPath = path.scope.getBinding(name).path;
            assertImportNames.push({
              type: "require",
              name,
              path: bindingPath
            });
            path.parentPath.remove();
          }
        }
        for (var assertName of assertImportNames) {
          if (path.scope.hasBinding(assertName.name)) {
            if (
              path.scope.getBinding(assertName.name).path === assertName.path
            ) {
              if (
                t.isCallExpression(path.node) &&
                path.node.callee.name === assertName.name
              ) {
                path.remove();
              }
            }
          }
        }
      }
    };
  }

  traverse(ast, assertVisitor());
}
