
import esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isWatch = process.argv.includes('--watch');



const baseConfig = {
    entryPoints: [join(__dirname, 'src/app/index.tsx')],
    bundle: true,
    minify: !isWatch,
    sourcemap: true,
    target: 'es2020',
    platform: 'browser',
    format: 'esm',
    outdir: join(__dirname, 'dist'),
    treeShaking: true,
    splitting: true,
    chunkNames: 'chunks/[name]-[hash]',
    external: ['react', 'react-dom'],
};

async function build() {
    try {
        if (isWatch) {
            const context = await esbuild.context(baseConfig);
            await context.watch();
        } else {
            await esbuild.build(baseConfig);

            const fs = await import('fs');
            const files = fs.readdirSync(join(__dirname, 'dist'));
            files.forEach(file => {
                const stats = fs.statSync(join(__dirname, 'dist', file));
                console.log(`${file}: ${(stats.size / 1024).toFixed(2)} KB`);
            });
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

void build();
