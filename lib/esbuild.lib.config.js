import esbuild from 'esbuild';

const entryPoints = [
    'src/index.ts',
    'src/math.ts',
    'src/string.ts'
];

const external = ['react', 'react-dom'];

const commonOptions = {
    bundle: true,
    external,
    platform: 'neutral',
    target: ['es2020', 'node16'],
    minify: true,
    sourcemap: true,
};

async function buildESM() {
    await esbuild.build({
        ...commonOptions,
        entryPoints,
        outdir: 'dist/esm',
        format: 'esm',
        outExtension: { '.js': '.js' },
    });
}

async function buildCJS() {
    await esbuild.build({
        ...commonOptions,
        entryPoints,
        outdir: 'dist/cjs',
        format: 'cjs',
        outExtension: { '.js': '.js' },
    });
}

async function buildAll() {
    try {
        await Promise.all([buildESM(), buildCJS()]);
    } catch (error) {
        process.exit(1);
    }
}

void buildAll();
