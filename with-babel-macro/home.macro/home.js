import { createMacro } from 'babel-plugin-macros';

const macro = ({ references, state: {}, babel: { types: t } }) => {
    references.default.forEach(path => {
        const callExpressionPath = path.parentPath;

        if (callExpressionPath && t.isCallExpression(callExpressionPath)) {
            // path.container.arguments[0].value
            const webpackCommentImportPath = callExpressionPath.get('arguments')[0].evaluate()
                .value;
            console.log('webpackCommentImportPath: ', webpackCommentImportPath);
        }
    });
};

export default createMacro(macro);
