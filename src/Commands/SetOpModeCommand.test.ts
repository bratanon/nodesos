import { ACTION_SET, CMD_OPMODE } from '../Const';
import { OperationMode } from '../Enums';
import SetOpModeCommand from './SetOpModeCommand';

describe('SetOpModeCommand', () => {
  let command: SetOpModeCommand;
  beforeEach(() => {
    command = new SetOpModeCommand(OperationMode.Disarm);
  });

  test('action', () => {
    expect(command.action).toEqual(ACTION_SET);
  });

  test('args', () => {
    expect(command.args).toBe('0');
  });

  test('name', () => {
    expect(command.name).toEqual(CMD_OPMODE);
  });
});
