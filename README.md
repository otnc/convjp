# convjp

日本語用の文字化けエンコード・デコードライブラリ

> [!NOTE]
> ブラウザ(Web)環境の安定版(バンドル)はこちら: [convjp-browser](https://www.npmjs.com/package/convjp-browser)

## 使い方

### CommonJS

```js
const Mojibake = require('convjp');

const mojibake = new Mojibake();

const input = 'もぺもぺ';
const encoded = mojibake.encode(input);
const decoded = mojibake.decode(encoded);
console.log(encoded); // '繧ゅ⊆繧ゅ⊆'
console.log(decoded); // 'もぺもぺ'
```

### ESM

```js
import Mojibake from 'convjp';
// import { Mojibake } from 'convjp'; でもOK

const mojibake = new Mojibake();

const input = 'もぺもぺ';
const encoded = mojibake.encode(input);
const decoded = mojibake.decode(encoded);
console.log(encoded); // '繧ゅ⊆繧ゅ⊆'
console.log(decoded); // 'もぺもぺ'
```

## 開発

パッケージマネージャーは pnpm（corepack でバージョン管理）を使用します。

```sh
corepack enable
pnpm install
pnpm build        # src/ から dist/ をビルド (esbuild + tsc)
pnpm test         # dist/ の ESM/CJS をテスト (jest)
pnpm lint         # ESLint
pnpm format       # Prettier
```

- ソースコードは `src/` にあります（JavaScript + JSDoc）
- 型定義は JSDoc からビルド時に自動生成されます（`dist/index.d.mts` / `dist/index.d.cts`）
- `dist/` が npm に公開されます（`iconv-lite` をバンドル済み）

## リリース

GitHub Actions の `release` ワークフローを手動実行（`workflow_dispatch`）します。
バージョン入力には semver キーワード（`patch` / `minor` / `major` / `prerelease`）または明示的なバージョン（例: `1.1.0`）を指定できます。
ワークフローがチェック・ビルド・テストを実行し、`package.json` のバージョンを更新して npm に公開、タグと GitHub Release を作成します。
