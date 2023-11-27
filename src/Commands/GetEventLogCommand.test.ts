import GetEventLogCommand from './GetEventLogCommand';
import { ACTION_GET, ACTION_NONE, CMD_EVENT_LOG } from '../Const';

describe('GetEventLogCommand', () => {
  let command: GetEventLogCommand;
  beforeEach(() => {
    command = new GetEventLogCommand(1);
  });

  test('constructor', () => {
    expect(command.index).toEqual(1);
  });

  test('action', () => {
    expect(command.action).toEqual(ACTION_NONE);
  });

  test('args', () => {
    expect(command.args).toEqual("001");
  });

  test('name', () => {
    expect(command.name).toEqual(CMD_EVENT_LOG);
  });

  test('format', () => {
    expect(command.format()).toEqual("!ev001&");
  });
});
