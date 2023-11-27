import PropertyChangedInfo from './PropertyChangedInfo';

describe('PropertyChangedInfo', () => {
  test('constructor', () => {
    const change = new PropertyChangedInfo('foo', true, false);
    expect(change.name).toEqual('foo');
    expect(change.oldValue).toEqual(true);
    expect(change.newValue).toEqual(false);
  })
});
