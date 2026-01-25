# convjp

日本語用の文字化けエンコード・デコードライブラリ

> [!NOTE]
> ブラウザ(Web)環境の安定版(バンドル)はこちら: [convjp-browser](https://www.npmjs.com/package/convjp-browser)

## 使い方

```js
const Mojibake = require('convjp');

const mojibake = new Mojibake();

const input = 'もぺもぺ';
const encoded = mojibake.encode(input);
const decoded = mojibake.decode(encoded);
console.log(encoded); // '繧ゅ⊆繧ゅ⊆'
console.log(decoded); // 'もぺもぺ'
```
