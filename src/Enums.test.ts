import { Enum, FlagEnum, IntEnum } from './Enums';

const TestFlags = Object.freeze({
  Foo: 0x01,
  Bar: 0x02,
  Baz: 0x04,
  Qux: 0x08,
} as const) satisfies Enum;

const TestEnum = Object.freeze({
  Foo: 0x01,
  Bar: 0x02,
  Baz: 0x03,
  Qux: 0x04,
} as const) satisfies Enum;

describe('IntEnum', () => {
  test('getKey', () => {
    const subject = new IntEnum(TestEnum, 0x3);
    expect(subject.value).toEqual(0x3);
    expect(subject.string).toEqual('Baz');
  });
});

describe('FlagEnum', () => {
  test('getKeys 0xF', () => {
    const subject = new FlagEnum(TestFlags, 0x3);
    expect(subject.value).toEqual(0x3);
    expect(subject.string).toEqual('Foo|Bar');
  });

  test('has', () => {
    const subject = new FlagEnum(TestFlags, 0x3);
    expect(subject.has(TestFlags.Bar)).toEqual(true);
    expect(subject.has(TestFlags.Qux)).toEqual(false);
  });
})
