import { CMD_DEVICE_PREFIX } from '../Const';
import { DC_BURGLAR } from '../DeviceCategory';
import DeviceAddingResponse from './DeviceAddingResponse';

describe('DeviceAddingResponse', () => {
  test('constructor', () => {
    const response = new DeviceAddingResponse('ibl');
    expect(response.commandName).toEqual(CMD_DEVICE_PREFIX + DC_BURGLAR.code);
    expect(response.deviceCategory).toEqual(DC_BURGLAR);
  });
});
