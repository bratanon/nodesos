import { ACTION_GET, CMD_EXIT_DELAY } from '../Const';
import GetExitDelayCommand from './GetExitDelayCommand';

describe('GetExitDelayCommand', () => {
  let command: GetExitDelayCommand;
  beforeEach(() => {
    command = new GetExitDelayCommand();
  });

  test('action', () => {
    expect(command.action).toEqual(ACTION_GET);
  });

  test('name', () => {
    expect(command.name).toEqual(CMD_EXIT_DELAY);
  });
});
