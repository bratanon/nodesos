import { OperationMode } from '../Enums';
import SetOpModeCommand from './SetOpModeCommand';
import { ACTION_SET, CMD_OPMODE } from '../Const';

describe('SetOpModeCommand', () => {
  let command: SetOpModeCommand;
  beforeEach(() => {
    command = new SetOpModeCommand(OperationMode.Disarm);
  });

  test('action', () => {
    expect(command.action).toEqual(ACTION_SET);
  });

  test('args', () => {
    expect(command.args).toEqual("0");
  });

  test('name', () => {
    expect(command.name).toEqual(CMD_OPMODE);
  });
});
