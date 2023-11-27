import { ESFlags } from '../Enums';
import ChangeDeviceCommand from './ChangeDeviceCommand';
import { ACTION_SET, CMD_DEVICE_PREFIX } from '../Const';
import { DC_BURGLAR } from '../DeviceCategory';

describe('ChangeDeviceCommand', () => {
  let command: ChangeDeviceCommand;
  beforeEach(() => {
    command = new ChangeDeviceCommand(
      DC_BURGLAR,
      1,
      2,
      3,
      ESFlags.Supervised ^ ESFlags.AlarmSiren
    );
  });

  test('constructor', () => {
    expect(command.deviceCategory).toEqual(DC_BURGLAR);
    expect(command.index).toEqual(1);
    expect(command.groupNumber).toEqual(2);
    expect(command.unitNumber).toEqual(3);
    expect(command.enableStatus).toEqual(ESFlags.Supervised ^ ESFlags.AlarmSiren);
  });

  test('action', () => {
    expect(command.action).toEqual(ACTION_SET);
  });

  test('args', () => {
    const enableStatus = (ESFlags.Supervised ^ ESFlags.AlarmSiren).toString(16).padStart(4, '0');
    expect(command.args).toEqual(`010203${enableStatus}0000`);
  });

  test('name', () => {
    expect(command.name).toEqual(CMD_DEVICE_PREFIX + command.deviceCategory.code);
  });
});
