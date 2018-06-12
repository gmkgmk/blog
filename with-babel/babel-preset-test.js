var babel = require('babel-core');
var t = require('babel-types');

module.exports = function ({ types: t }) {
  return {
    visitor: {
      Identifier(path, state) {
        console.log(console.log(state.opts))
        path.scope.rename(path.node.name, "_" + path.node.name);
      },
      VariableDeclaration(path) {
        var kind = path.node.kind;
        if ('let' === kind) {
          kind = 'var'
        }
        path.node.kind = kind
      },
      ArrayExpression(path) {
        let result = path.node.elements.reduce((p, d) => p + d.value, '')
        path.replaceWith(t.stringLiteral(result));
      },
    }
  };
}