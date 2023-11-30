import * as Utils from './Util';
test('toAsciiHex', () => {
  expect(Utils.toAsciiHex(0, 0)).toBe('');
  expect(Utils.toAsciiHex(0, 1)).toBe('0');
  expect(Utils.toAsciiHex(0, 4)).toBe('0000');
  expect(Utils.toAsciiHex(1, 1)).toBe('1');
  expect(Utils.toAsciiHex(1, 3)).toBe('001');
  expect(Utils.toAsciiHex(2, 1)).toBe('2');
  expect(Utils.toAsciiHex(3, 1)).toBe('3');
  expect(Utils.toAsciiHex(4, 1)).toBe('4');
  expect(Utils.toAsciiHex(5, 1)).toBe('5');
  expect(Utils.toAsciiHex(6, 1)).toBe('6');
  expect(Utils.toAsciiHex(7, 1)).toBe('7');
  expect(Utils.toAsciiHex(8, 1)).toBe('8');
  expect(Utils.toAsciiHex(9, 1)).toBe('9');
  expect(Utils.toAsciiHex(10, 1)).toBe(':');
  expect(Utils.toAsciiHex(10, 2)).toBe('0:');
  expect(Utils.toAsciiHex(10, 4)).toBe('000:');
  expect(Utils.toAsciiHex(11, 1)).toBe(';');
  expect(Utils.toAsciiHex(12, 1)).toBe('<');
  expect(Utils.toAsciiHex(13, 1)).toBe('=');
  expect(Utils.toAsciiHex(14, 1)).toBe('>');
  expect(Utils.toAsciiHex(15, 1)).toBe('?');
  expect(Utils.toAsciiHex(170, 2)).toBe('::');
  expect(Utils.toAsciiHex(175, 2)).toBe(':?');
  expect(Utils.toAsciiHex(187, 2)).toBe(';;');
});

test('fromAsciiHex', () => {
  expect(Utils.fromAsciiHex('0')).toBe(0x0);
  expect(Utils.fromAsciiHex('1')).toBe(0x1);
  expect(Utils.fromAsciiHex('2')).toBe(0x2);
  expect(Utils.fromAsciiHex('3')).toBe(0x3);
  expect(Utils.fromAsciiHex('4')).toBe(0x4);
  expect(Utils.fromAsciiHex('5')).toBe(0x5);
  expect(Utils.fromAsciiHex('6')).toBe(0x6);
  expect(Utils.fromAsciiHex('7')).toBe(0x7);
  expect(Utils.fromAsciiHex('8')).toBe(0x8);
  expect(Utils.fromAsciiHex('9')).toBe(0x9);
  expect(Utils.fromAsciiHex(':')).toBe(0xA);
  expect(Utils.fromAsciiHex('a')).toBe(0xA);
  expect(Utils.fromAsciiHex(';')).toBe(0xB);
  expect(Utils.fromAsciiHex('b')).toBe(0xB);
  expect(Utils.fromAsciiHex('<')).toBe(0xC);
  expect(Utils.fromAsciiHex('c')).toBe(0xC);
  expect(Utils.fromAsciiHex('=')).toBe(0xD);
  expect(Utils.fromAsciiHex('d')).toBe(0xD);
  expect(Utils.fromAsciiHex('>')).toBe(0xE);
  expect(Utils.fromAsciiHex('e')).toBe(0xE);
  expect(Utils.fromAsciiHex('?')).toBe(0xF);
  expect(Utils.fromAsciiHex('f')).toBe(0xF);
  expect(Utils.fromAsciiHex('f')).toBe(15);
  expect(Utils.fromAsciiHex(':;<=>?')).toBe(0xABCDEF);
  expect(() => Utils.fromAsciiHex('ÅÄÖ')).toThrow('Response contains invalid character.');
});

test('isAsciiHex', () => {
  expect(Utils.isAsciiHex(':;<=>?')).toBe(true);
  expect(Utils.isAsciiHex('ÅÄÖ')).toBe(false);
});
