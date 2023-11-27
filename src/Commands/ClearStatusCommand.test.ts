import ClearStatusCommand from './ClearStatusCommand';
import { ACTION_NONE, CMD_CLEAR_STATUS } from '../Const';

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
