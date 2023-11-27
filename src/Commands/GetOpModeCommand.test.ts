import GetOpModeCommand from './GetOpModeCommand';
import { ACTION_GET, CMD_OPMODE } from '../Const';

describe('GetOpModeCommand', () => {
  let command: GetOpModeCommand;
  beforeEach(() => {
    command = new GetOpModeCommand();
  });

  test('action', () => {
    expect(command.action).toEqual(ACTION_GET);
  });

  test('name', () => {
    expect(command.name).toEqual(CMD_OPMODE);
  });
});
