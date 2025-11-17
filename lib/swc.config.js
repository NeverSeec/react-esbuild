const config = {
    jsc: {
        parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: true,
            dynamicImport: true
        },
        transform: {
            react: {
                runtime: 'automatic'
            },
            decoratorMetadata: true,
            legacyDecorator: true
        },
        target: 'es2020',
        externalHelpers: true,
        keepClassNames: true,
        baseUrl: '.',
        paths: {
            '@/*': ['./src/*']
        }
    },
    sourceMaps: true
};

export const esmConfig = {
    ...config,
    module: {
        type: 'es6',
        strict: true,
        strictMode: true,
        lazy: false,
        noInterop: true
    },
    minify: false // Отключаем minify в основной сборке, можно включить отдельно
};

export const cjsConfig = {
    ...config,
    module: {
        type: 'commonjs',
        strict: true,
        strictMode: true,
        lazy: false,
        noInterop: false
    },
    minify: false
};

export const minifiedConfig = {
    ...config,
    jsc: {
        ...config.jsc,
        minify: {
            compress: {
                unused: true,
                dead_code: true,
                drop_console: false,
                pure_funcs: ['console.log']
            },
            mangle: true
        }
    },
    minify: true
};

export default esmConfig;
