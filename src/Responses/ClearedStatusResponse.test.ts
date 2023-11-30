import { CMD_CLEAR_STATUS } from '../Const';
import ClearedStatusResponse from './ClearedStatusResponse';

test('ClearedStatusResponse', () => {
  const response = new ClearedStatusResponse();
  expect(response.commandName).toEqual(CMD_CLEAR_STATUS);
});
