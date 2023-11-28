import { CMD_DEVICE_PREFIX } from '../Const';
import { DC_BURGLAR } from '../DeviceCategory';
import { ESFlags, FlagEnum } from '../Enums';
import DeviceChangedResponse from './DeviceChangedResponse';

describe('DeviceChangedResponse', () => {
  test('constructor', () => {
    const response = new DeviceChangedResponse('ibs0511021410');
    expect(response.commandName).toEqual(CMD_DEVICE_PREFIX + DC_BURGLAR.code);
    expect(response.deviceCategory).toEqual(DC_BURGLAR);
    expect(response.enableStatus).toEqual(new FlagEnum(ESFlags, ESFlags.HomeGuard | ESFlags.AlarmSiren | ESFlags.Supervised));
    expect(response.groupNumber).toBe(17);
    expect(response.index).toBe(5);
    expect(response.unitNumber).toBe(2);
    expect(response.zone).toBe('11-02');
  });
});
