module.exports = {
    presets: [
        [
            '@babel/env',
            {
                modules: 'commonjs',
                useBuiltIns: 'usage',
                corejs: 2
            }
        ]
    ],
    plugins: [
        'babel-plugin-macros',
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: false,
                helpers: true,
                regenerator: true,
                useESModules: false
            }
        ]
    ]
};
