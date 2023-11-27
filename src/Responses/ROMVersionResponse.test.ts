import { CMD_ROMVER } from '../Const';
import ROMVersionResponse from './ROMVersionResponse';

describe('ROMVersionResponse', () => {
  test('version', () => {
    const response = new ROMVersionResponse('vn01-02 012345 a*b');
    expect(response.version).toEqual('01-02 012345 a*b');
    expect(response.commandName).toEqual(CMD_ROMVER);
  });
});
