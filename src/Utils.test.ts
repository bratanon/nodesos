import EventLogResponse from './Responses/EventLogResponse';
import * as Utils from './Util';

test('toAsciiHex', () => {
  expect(Utils.toAsciiHex(0, 0)).toEqual('');
  expect(Utils.toAsciiHex(0, 1)).toEqual('0');
  expect(Utils.toAsciiHex(0, 4)).toEqual('0000');
  expect(Utils.toAsciiHex(1, 1)).toEqual('1');
  expect(Utils.toAsciiHex(1, 3)).toEqual('001');
  expect(Utils.toAsciiHex(2, 1)).toEqual('2');
  expect(Utils.toAsciiHex(3, 1)).toEqual('3');
  expect(Utils.toAsciiHex(4, 1)).toEqual('4');
  expect(Utils.toAsciiHex(5, 1)).toEqual('5');
  expect(Utils.toAsciiHex(6, 1)).toEqual('6');
  expect(Utils.toAsciiHex(7, 1)).toEqual('7');
  expect(Utils.toAsciiHex(8, 1)).toEqual('8');
  expect(Utils.toAsciiHex(9, 1)).toEqual('9');
  expect(Utils.toAsciiHex(10, 1)).toEqual(':');
  expect(Utils.toAsciiHex(10, 2)).toEqual('0:');
  expect(Utils.toAsciiHex(10, 4)).toEqual('000:');
  expect(Utils.toAsciiHex(11, 1)).toEqual(';');
  expect(Utils.toAsciiHex(12, 1)).toEqual('<');
  expect(Utils.toAsciiHex(13, 1)).toEqual('=');
  expect(Utils.toAsciiHex(14, 1)).toEqual('>');
  expect(Utils.toAsciiHex(15, 1)).toEqual('?');
  expect(Utils.toAsciiHex(170, 2)).toEqual('::');
  expect(Utils.toAsciiHex(175, 2)).toEqual(':?');
  expect(Utils.toAsciiHex(187, 2)).toEqual(';;');
});

test('fromAsciiHex', () => {
  expect(Utils.fromAsciiHex('0')).toEqual(0x0);
  expect(Utils.fromAsciiHex('1')).toEqual(0x1);
  expect(Utils.fromAsciiHex('2')).toEqual(0x2);
  expect(Utils.fromAsciiHex('3')).toEqual(0x3);
  expect(Utils.fromAsciiHex('4')).toEqual(0x4);
  expect(Utils.fromAsciiHex('5')).toEqual(0x5);
  expect(Utils.fromAsciiHex('6')).toEqual(0x6);
  expect(Utils.fromAsciiHex('7')).toEqual(0x7);
  expect(Utils.fromAsciiHex('8')).toEqual(0x8);
  expect(Utils.fromAsciiHex('9')).toEqual(0x9);
  expect(Utils.fromAsciiHex(':')).toEqual(0xA);
  expect(Utils.fromAsciiHex('a')).toEqual(0xA);
  expect(Utils.fromAsciiHex(';')).toEqual(0xB);
  expect(Utils.fromAsciiHex('b')).toEqual(0xB);
  expect(Utils.fromAsciiHex('<')).toEqual(0xC);
  expect(Utils.fromAsciiHex('c')).toEqual(0xC);
  expect(Utils.fromAsciiHex('=')).toEqual(0xD);
  expect(Utils.fromAsciiHex('d')).toEqual(0xD);
  expect(Utils.fromAsciiHex('>')).toEqual(0xE);
  expect(Utils.fromAsciiHex('e')).toEqual(0xE);
  expect(Utils.fromAsciiHex('?')).toEqual(0xF);
  expect(Utils.fromAsciiHex('f')).toEqual(0xF);
  expect(Utils.fromAsciiHex('f')).toEqual(15);
  expect(Utils.fromAsciiHex(':;<=>?')).toEqual(0xABCDEF);
  expect(() => Utils.fromAsciiHex('ÅÄÖ')).toThrow('Response contains invalid character.');
});

test('isAsciiHex', () => {
  expect(Utils.isAsciiHex(':;<=>?')).toEqual(true);
  expect(Utils.isAsciiHex('ÅÄÖ')).toEqual(false);
});


