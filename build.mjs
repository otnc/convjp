import { build } from 'esbuild';
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { rimrafSync } from 'rimraf';

// ビルド前に dist をクリーンにする
rimrafSync('dist');
mkdirSync('dist', { recursive: true });

const common = {
  entryPoints: ['src/index.js'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  minify: false,
  sourcemap: false,
  legalComments: 'inline',
};

// ESM
await build({
  ...common,
  format: 'esm',
  outfile: 'dist/index.mjs',
  banner: {
    js: `import { createRequire } from 'node:module';\nconst require = createRequire(import.meta.url);`,
  },
});

// CJS
await build({
  ...common,
  format: 'cjs',
  outfile: 'dist/index.cjs',
  footer: {
    // module.exports をクラス本体にする（v1.x と同じ require API を維持）
    js: 'module.exports = module.exports.default;',
  },
});

// 型定義を JSDoc から自動生成 (tsc --emitDeclarationOnly)
execSync('pnpm exec tsc -p tsconfig.json', { stdio: 'inherit' });

// dist/index.d.ts が生成されるので、ESM/CJS 用に変換する
const dts = readFileSync('dist/index.d.ts', 'utf8');

// ESM 用: そのまま .d.mts へ
writeFileSync('dist/index.d.mts', dts);

// CJS 用: default export を export = に変換
const cts =
  dts
    .replace('export default class Mojibake', 'declare class Mojibake')
    .replace('export { Mojibake };', '')
    .trimEnd() + '\n\nexport = Mojibake;\n';
writeFileSync('dist/index.d.cts', cts);

rimrafSync('dist/index.d.ts');

console.log('Build complete: dist/index.mjs, dist/index.cjs, dist/index.d.mts, dist/index.d.cts');
