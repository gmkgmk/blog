var t = require('babel-types');

let addPrefix = path => (prefix = "_") => {
  let name = path.node.name;
  path.scope.rename(prefix + path.node.name);
}

let updateKind = path => {
  var kind = path.node.kind;
  switch (kind) {
    case 'let':
    case 'const':
      kind = 'var'
      break;
    default:
      break;
  }
}

module.exports = function ({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        addPrefix(path)();
      },
      VariableDeclaration(path) {
        updateKind(path)
      },
      ArrayExpression(path) {
        let result = path.node.elements.reduce((p, d) => p + d.value, '')
        path.replaceWith(t.stringLiteral(result));
      }
    }
  };
}