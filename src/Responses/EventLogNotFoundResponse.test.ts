import { CMD_EVENT_LOG } from '../Const';
import EventLogNotFoundResponse from './EventLogNotFoundResponse';


test('EventLogNotFoundResponse', () => {
  const response = new EventLogNotFoundResponse();
  expect(response.commandName).toEqual(CMD_EVENT_LOG);
});
