import { ACTION_ADD, CMD_DEVICE_PREFIX } from '../Const';
import { DC_BURGLAR } from '../DeviceCategory';
import AddDeviceCommand from './AddDeviceCommand';

describe('AddDeviceCommand', () => {
  let command: AddDeviceCommand;
  beforeEach(() => {
    command = new AddDeviceCommand(DC_BURGLAR);
  });

  test('constructor', () => {
    expect(command.deviceCategory).toEqual(DC_BURGLAR);
  });

  test('action', () => {
    expect(command.action).toEqual(ACTION_ADD);
  });

  test('name', () => {
    expect(command.name).toEqual(CMD_DEVICE_PREFIX + command.deviceCategory.code);
  });
});
