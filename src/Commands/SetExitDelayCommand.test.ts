import SetExitDelayCommand from './SetExitDelayCommand';
import { ACTION_SET, CMD_EXIT_DELAY, } from '../Const';

describe('SetExitDelayCommand', () => {
  let command: SetExitDelayCommand;
  beforeEach(() => {
    command = new SetExitDelayCommand(5);
  });

  test('constructor', () => {
    expect(command.exitDelay).toEqual(5);
  });

  test('constructor fails when entryDelay < 0x00', () => {
    expect(() => new SetExitDelayCommand(-1))
      .toThrow('Exit delay cannot be negative.');
  });

  test('constructor fails when entryDelay < 0xff', () => {
    expect(() => new SetExitDelayCommand(256))
      .toThrow('Exit delay cannot exceed 255 seconds.');
  });

  test('action', () => {
    expect(command.action).toEqual(ACTION_SET);
  });

  test('args', () => {
    expect(command.args).toEqual("05");
  });

  test('name', () => {
    expect(command.name).toEqual(CMD_EXIT_DELAY);
  });
});
