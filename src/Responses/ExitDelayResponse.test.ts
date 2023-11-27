import { CMD_EXIT_DELAY } from '../Const';
import ExitDelayResponse from './ExitDelayResponse';

describe('ExitDelayResponse', () => {
  describe('when responding to ACTION_SET', () => {
    let response: ExitDelayResponse;
    beforeAll(() => {
      response = new ExitDelayResponse('l0s05');
    });

    test('constructor', () => {
      expect(response.wasSet).toEqual(true);
      expect(response.exitDelay).toEqual(5);
      expect(response.commandName).toEqual(CMD_EXIT_DELAY);
    });
  });

  describe('when responding to ACTION_GET', () => {
    let response: ExitDelayResponse;
    beforeAll(() => {
      response = new ExitDelayResponse('l005');
    });

    test('constructor', () => {
      expect(response.wasSet).toEqual(false);
      expect(response.exitDelay).toEqual(5);
      expect(response.commandName).toEqual(CMD_EXIT_DELAY);
    });
  });
});

