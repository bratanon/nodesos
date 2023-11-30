import { ACTION_DEL, CMD_DEVICE_PREFIX } from '../Const';
import { DC_BURGLAR } from '../DeviceCategory';
import DeleteDeviceCommand from './DeleteDeviceCommand';

describe('DeleteDeviceCommand', () => {
  let command: DeleteDeviceCommand;
  beforeEach(() => {
    command = new DeleteDeviceCommand(DC_BURGLAR, 1);
  });

  test('constructor', () => {
    expect(command.deviceCategory).toEqual(DC_BURGLAR);
    expect(command.index).toBe(1);
  });

  test('action', () => {
    expect(command.action).toEqual(ACTION_DEL);
  });

  test('args', () => {
    expect(command.args).toBe('01');
  });

  test('name', () => {
    expect(command.name).toEqual(CMD_DEVICE_PREFIX + command.deviceCategory.code);
  });
});
