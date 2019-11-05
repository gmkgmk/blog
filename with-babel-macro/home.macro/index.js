"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.for-each");

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _babelPluginMacros = require("babel-plugin-macros");

var macro = function macro(_ref) {
  var references = _ref.references;
  (0, _objectDestructuringEmpty2["default"])(_ref.state);
  var t = _ref.babel.types;
  references["default"].forEach(function (path) {
    var callExpressionPath = path.parentPath;

    if (callExpressionPath && t.isCallExpression(callExpressionPath)) {
      // path.container.arguments[0].value
      var webpackCommentImportPath = callExpressionPath.get('arguments')[0].evaluate().value;
      console.log('webpackCommentImportPath: ', webpackCommentImportPath);
    }
  });
};

var _default = (0, _babelPluginMacros.createMacro)(macro);

exports["default"] = _default;
