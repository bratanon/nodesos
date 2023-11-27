import { CMD_DEVICE_PREFIX } from '../Const';
import { DC_BURGLAR } from '../DeviceCategory';
import DeviceDeletedResponse from './DeviceDeletedResponse';

describe('DeviceDeletedResponse', () => {
  test('constructor', () => {
    const response = new DeviceDeletedResponse('ibk01');
    expect(response.commandName).toEqual(CMD_DEVICE_PREFIX + DC_BURGLAR.code);
    expect(response.deviceCategory).toEqual(DC_BURGLAR);
    expect(response.index).toEqual(1);
  });
});
