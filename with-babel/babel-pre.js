var babel = require('babel-core');
var t = require('babel-types');

let addPrefix = path => (prefix = "_") => {
  let name = path.node.name;
  path.scope.rename(name);
}

module.exports = function ({ types: t }) {
  return {
    visitor: {
      Identifier(path, { opts }) {
        const type = path.getStatementParent().type;
        if (type == 'FunctionDeclaration') {
          if (opts.func) {
            addPrefix(path)(opts.spec)
          }
        }
        if (type == 'ExpressionStatement') {
          if (opts.var) {
            addPrefix(path)(opts.spec)
          }
        }
      }
    }
  };
}