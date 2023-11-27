import GetDeviceCommand from './GetDeviceCommand';
import { ACTION_GET, CMD_DEVICE_PREFIX } from '../Const';
import { DC_BURGLAR } from '../DeviceCategory';

describe('GetDeviceCommand', () => {
  let command: GetDeviceCommand;
  beforeEach(() => {
    command = new GetDeviceCommand(DC_BURGLAR, 1, 2);
  });

  test('constructor', () => {
    expect(command.deviceCategory).toEqual(DC_BURGLAR);
    expect(command.groupNumber).toEqual(1);
    expect(command.unitNumber).toEqual(2);
  });

  test('action', () => {
    expect(command.action).toEqual(ACTION_GET);
  });

  test('args', () => {
    expect(command.args).toEqual('0102');
  });

  test('name', () => {
    expect(command.name).toEqual(CMD_DEVICE_PREFIX + command.deviceCategory.code);
  });
});
