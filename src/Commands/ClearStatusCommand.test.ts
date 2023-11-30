import { ACTION_NONE, CMD_CLEAR_STATUS } from '../Const';
import ClearStatusCommand from './ClearStatusCommand';

describe('ClearStatusCommand', () => {
  let command: ClearStatusCommand;
  beforeEach(() => {
    command = new ClearStatusCommand();
  });

  test('action', () => {
    expect(command.action).toEqual(ACTION_NONE);
  });

  test('name', () => {
    expect(command.name).toEqual(CMD_CLEAR_STATUS);
  });
});
