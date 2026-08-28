import iconv from 'iconv-lite';

/**
 * 日本語用の文字化けエンコード・デコードクラス
 */
export default class Mojibake {
  /**
   * 文字化けを意図的に作成する
   * @param {string} input - 文字列
   * @returns {string} - 文字化けした文字列
   */
  encode(input) {
    const utf8Buffer = iconv.encode(input, 'UTF-8');
    const sjisBuffer = iconv.decode(utf8Buffer, 'Shift_JIS');
    return sjisBuffer.toString('binary');
  }

  /**
   * 文字化けした文字列を復元する
   * @param {string} input - 文字化けした文字列
   * @returns {string} - 元の文字列
   */
  decode(input) {
    const sjisBuffer = iconv.encode(input, 'Shift_JIS');
    const utf8Buffer = iconv.decode(sjisBuffer, 'UTF-8');
    return utf8Buffer;
  }
}

export { Mojibake };
