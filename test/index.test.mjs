import { createRequire } from 'node:module';

import Mojibake, { Mojibake as NamedMojibake } from '../dist/index.mjs';

const require = createRequire(import.meta.url);

describe('Mojibake (ESM)', () => {
  test('encode/decode roundtrip', () => {
    const mojibake = new Mojibake();
    const input = 'もぺもぺ';
    const encoded = mojibake.encode(input);
    expect(encoded).toBe('繧ゅ⊆繧ゅ⊆');
    expect(mojibake.decode(encoded)).toBe(input);
  });

  test('named export is the same as default', () => {
    expect(NamedMojibake).toBe(Mojibake);
  });
});

describe('Mojibake (CJS)', () => {
  test('encode/decode roundtrip', () => {
    const MojibakeCJS = require('../dist/index.cjs');
    const mojibake = new MojibakeCJS();
    const input = 'こんにちは世界';
    const encoded = mojibake.encode(input);
    expect(mojibake.decode(encoded)).toBe(input);
  });
});
