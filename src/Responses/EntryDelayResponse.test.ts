import { CMD_ENTRY_DELAY } from '../Const';
import EntryDelayResponse from './EntryDelayResponse';

describe('EntryDelayResponse', () => {
  describe('when responding to ACTION_SET', () => {
    let response: EntryDelayResponse;
    beforeAll(() => {
      response = new EntryDelayResponse('l1s06');
    });

    test('constructor', () => {
      expect(response.wasSet).toEqual(true);
      expect(response.entryDelay).toEqual(6);
      expect(response.commandName).toEqual(CMD_ENTRY_DELAY);
    });
  });

  describe('when responding to ACTION_GET', () => {
    let response: EntryDelayResponse;
    beforeAll(() => {
      response = new EntryDelayResponse('l106');
    });

    test('constructor', () => {
      expect(response.wasSet).toEqual(false);
      expect(response.entryDelay).toEqual(6);
      expect(response.commandName).toEqual(CMD_ENTRY_DELAY);
    });
  });
});
