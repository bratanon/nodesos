import GetDateTimeCommand from './Commands/GetDateTimeCommand';
import EventEmitter from 'events';
import * as log4js from 'log4js';
import { Socket } from 'net';
import ClearStatusCommand from './Commands/ClearStatusCommand';
import ContactID from './ContactId';
import DeviceEvent from './DeviceEvent';
import { Protocol, State } from './Protocol';
import ClearedStatusResponse from './Responses/ClearedStatusResponse';
import DateTimeResponse from './Responses/DateTimeResponse';
import DeviceAddedResponse from './Responses/DeviceAddedResponse';
import DeviceAddingResponse from './Responses/DeviceAddingResponse';
import DeviceChangedResponse from './Responses/DeviceChangedResponse';
import DeviceDeletedResponse from './Responses/DeviceDeletedResponse';
import DeviceInfoResponse from './Responses/DeviceInfoResponse';
import DeviceNotFoundResponse from './Responses/DeviceNotFoundResponse';
import EntryDelayResponse from './Responses/EntryDelayResponse';
import EventLogNotFoundResponse from './Responses/EventLogNotFoundResponse';
import EventLogResponse from './Responses/EventLogResponse';
import ExitDelayResponse from './Responses/ExitDelayResponse';
import OpModeResponse from './Responses/OpModeResponse';
import ROMVersionResponse from './Responses/ROMVersionResponse';
import CommandTimeoutError from './Errors/CommandTimeoutError';

class ProtocolProxy extends Protocol {

  constructor() {
    super();
  }

  get host(): string | undefined {
    return undefined;
  }

  get port(): number | undefined {
    return undefined;
  }

  //
  // Proxy methods.
  //

  public handleOnError(err?: Error) {
    super.handleOnError(err);
  }

  public handleOnConnect() {
    super.handleOnConnect();
  }

  public handleOnClose(hadError: boolean) {
    super.handleOnClose(hadError);
  }

  public handleOnEnd() {
    super.handleOnEnd();
  }

  public handleOnData(data: Buffer) {
    super.handleOnData(data);
  }
}

const SERVER_PORT = 8080;

jest.mock('log4js', () => {
  const debug = jest.fn();
  const info = jest.fn();
  const warn = jest.fn();
  const error = jest.fn();
  const fatal = jest.fn();
  return {
    getLogger: jest.fn().mockImplementation(() => ({
      debug,
      info,
      warn,
      error,
      fatal,
    })),
  }
});

describe('Protocol', () => {
  let protocol: ProtocolProxy;

  beforeEach(() => {
    protocol = new ProtocolProxy();
  });

  test('constructor', () => {
    expect(protocol.socket).toBeInstanceOf(Socket);
    expect(protocol.socket.eventNames()).toEqual(['end', 'data', 'error', 'connect', 'close']);
  });

  describe('handleOnError', () => {
    describe('calls onConnectionError when defined', () => {
      beforeEach(() => {
        protocol.onConnectionError = jest.fn();
      });

      test('with undefined as argument', () => {
        protocol.handleOnError();
        expect(protocol.onConnectionError).toHaveBeenNthCalledWith(1, undefined);
      });

      test('with an error as argument', () => {
        protocol.handleOnError(new Error());
        expect(protocol.onConnectionError).toHaveBeenNthCalledWith(1, new Error());
      });
    });
  });

  describe('handleOnConnect', () => {
    test('sets _isConnected to true', () => {
      expect(protocol.isConnected).toEqual(false);
      protocol.handleOnConnect();
      expect(protocol.isConnected).toEqual(true);
    });

    test('calls onConnectionMade when defined', () => {
      protocol.onConnectionMade = jest.fn();
      protocol.handleOnConnect();
    });
  });

  describe('handleOnClose', () => {
    describe('calls onConnectionClose when defined', () => {
      beforeEach(() => {
        protocol.onConnectionClose = jest.fn();
      });

      test('with false as argument', () => {
        protocol.handleOnClose(false);
        expect(protocol.onConnectionClose).toHaveBeenNthCalledWith(1, false);
      });

      test('with true as argument', () => {
        protocol.handleOnClose(true);
        expect(protocol.onConnectionClose).toHaveBeenNthCalledWith(1, true);
      });
    });
  });

  describe('handleOnEnd', () => {
    test('sets _isConnected to false', () => {
      protocol.handleOnConnect();
      expect(protocol.isConnected).toEqual(true);
      protocol.handleOnEnd();
      expect(protocol.isConnected).toEqual(false);
    });

    test('calls onConnectionEnd when defined', () => {
      protocol.onConnectionEnd = jest.fn();
      protocol.handleOnEnd();
    });
  });

  describe('handleOnData', () => {
    test('Only for coverage', () => {
      // Only for coverage as istanbul can't ignore else-if statements.
      protocol.handleOnData(Buffer.from('XINPIC=\r\n', 'ascii'));
      protocol.handleOnData(Buffer.from('[et]\r\n', 'ascii'));
      protocol.handleOnData(Buffer.from('X10 ERR\r\n', 'ascii'));
      protocol.handleOnData(Buffer.from('Something else\r\n', 'ascii'));
    });

    test('handles the line buffer when given an incomplete line', () => {;
      protocol.onDeviceEvent = jest.fn();
      protocol.handleOnData(Buffer.from('MINP', 'ascii'));
      protocol.handleOnData(Buffer.from('IC=0000000000000000000000\r\n', 'ascii'));
      expect(protocol.onDeviceEvent).toHaveBeenNthCalledWith(1, expect.any(DeviceEvent));
    });

    describe('Device events', () => {
      test('calls onDeviceEvent when defined', () => {
        protocol.onDeviceEvent = jest.fn();
        protocol.handleOnData(Buffer.from('MINPIC=0000000000000000000000\r\n', 'ascii'));

        expect(protocol.onDeviceEvent).toHaveBeenNthCalledWith(1, expect.any(DeviceEvent));
      });

      test('dont call onDeviceEvent when DeviceEvent creation throws', () => {
        protocol.onDeviceEvent = jest.fn();
        protocol.handleOnData(Buffer.from('MINPIC=0\r\n', 'ascii'));

        expect(protocol.onDeviceEvent).not.toHaveBeenCalled();
      });
    });

    describe('Contact ID', () => {
      test('calls onContactId when defined', () => {
        protocol.onContactId = jest.fn();
        protocol.handleOnData(Buffer.from('(1ac318138403110e)\r\n', 'ascii'));

        expect(protocol.onContactId).toHaveBeenNthCalledWith(1, expect.any(ContactID));
      });

      test('dont call onContactId when DeviceEvent creation throws', () => {
        const string = '(0)\r\n';
        protocol.onContactId = jest.fn();
        protocol.handleOnData(Buffer.from(string, 'ascii'));

        expect(protocol.onContactId).not.toHaveBeenCalled();
      });
    });

    describe('Command responses', () => {
      const string = '!l5&\r\n'; // ClearedStatusResponse
      const state: State = { command: new ClearStatusCommand(), event: new EventEmitter() };
      let getExecutingMock: jest.Mock;

      beforeEach(() => {
        getExecutingMock = jest.fn();
        protocol.onResponse = jest.fn();
        Object.defineProperty(protocol, 'executing', { get: getExecutingMock });
      });

      test('not calls onResponse when command parse fails', () => {
        protocol.handleOnData(Buffer.from('!0&\r\n', 'ascii'));

        expect(protocol.onResponse).not.toHaveBeenCalled();
      });

      test('emits to the state event', (done) => {
        state.event.once(state.command.name, () => { done() });
        getExecutingMock.mockReturnValue({ [state.command.name]: state});

        protocol.handleOnData(Buffer.from(string, 'ascii'));
      });

      test('calls onResponse without command when given a known command response but its not executing', () => {
        getExecutingMock.mockReturnValue([]);

        protocol.handleOnData(Buffer.from(string, 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(ClearedStatusResponse), undefined);
      });

      test('calls onResponse with the command when given a known command response', () => {
        getExecutingMock.mockReturnValue({ [state.command.name]: state});

        protocol.handleOnData(Buffer.from(string, 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(ClearedStatusResponse), state.command);
      });
    });

    describe('Command parsing', () => {
      beforeEach(() => {
        protocol.onResponse = jest.fn();
      });

      test('not call onResponse when response text is empty', () => {
        protocol.handleOnData(Buffer.from('!&\r\n', 'ascii'));

        expect(protocol.onResponse).not.toHaveBeenCalled();
      });

      test('catch thrown error when response is not recognized', () => {
        protocol.handleOnData(Buffer.from('!xx&\r\n', 'ascii'));

        expect(log4js.getLogger().error).toHaveBeenCalledWith('Failed to parse response', expect.any(Error))
      });

      test('calls onResponse with a DateTimeResponse', () => {
        protocol.handleOnData(Buffer.from('!dt86042071200&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(DateTimeResponse), undefined);
      });

      test('calls onResponse with a OpModeResponse', () => {
        protocol.handleOnData(Buffer.from('!n08&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(OpModeResponse), undefined);
      });

      test('calls onResponse with a DeviceNotFoundResponse (K prefix) (RESPONSE_ERROR)', () => {
        protocol.handleOnData(Buffer.from('!kbno&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(DeviceNotFoundResponse), undefined);
      });

      test('calls onResponse with a DeviceNotFoundResponse (K prefix) (00)', () => {
        protocol.handleOnData(Buffer.from('!kb00&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(DeviceNotFoundResponse), undefined);
      });

      test('calls onResponse with a DeviceInfoResponse', () => {
        protocol.handleOnData(Buffer.from('!kb50f01a7a0010e41102141000005b05&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(DeviceInfoResponse), undefined);
      });

      test('calls onResponse with a DeviceNotFoundResponse (i prefix)', () => {
        protocol.handleOnData(Buffer.from('!ibno&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(DeviceNotFoundResponse), undefined);
      });

      test('calls onResponse with a DeviceAddingResponse', () => {
        protocol.handleOnData(Buffer.from('!ibl&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(DeviceAddingResponse), undefined);
      });

      test('calls onResponse with a DeviceAddedResponse', () => {
        protocol.handleOnData(Buffer.from('!ibl0511021410&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(DeviceAddedResponse), undefined);
      });

      test('calls onResponse with a DeviceChangedResponse', () => {
        protocol.handleOnData(Buffer.from('!ibs0511021410&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(DeviceChangedResponse), undefined);
      });

      test('calls onResponse with a DeviceDeletedResponse', () => {
        protocol.handleOnData(Buffer.from('!ibk01&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(DeviceDeletedResponse), undefined);
      });

      test('calls onResponse with a DeviceInfoResponse (i prefix)', () => {
        protocol.handleOnData(Buffer.from('!ib0050f01a7a0010e41102141000005b05&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(DeviceInfoResponse), undefined);
      });

      test('calls onResponse with a ClearedStatusResponse', () => {
        protocol.handleOnData(Buffer.from('!l5&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(ClearedStatusResponse), undefined);
      });

      test('calls onResponse with a ROMVersionResponse', () => {
        protocol.handleOnData(Buffer.from('!vn123456&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(ROMVersionResponse), undefined);
      });

      test('calls onResponse with a ExitDelayResponse', () => {
        protocol.handleOnData(Buffer.from('!l005&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(ExitDelayResponse), undefined);
      });

      test('calls onResponse with a EntryDelayResponse', () => {
        protocol.handleOnData(Buffer.from('!l105&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(EntryDelayResponse), undefined);
      });

      test('calls onResponse with a EventLogNotFoundResponse', () => {
        protocol.handleOnData(Buffer.from('!evno&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(EventLogNotFoundResponse), undefined);
      });

      test('calls onResponse with a EventLogResponse', () => {
        protocol.handleOnData(Buffer.from('!ev344160000200112201520b7&\r\n', 'ascii'));

        expect(protocol.onResponse).toHaveBeenNthCalledWith(1, expect.any(EventLogResponse), undefined);
      });
    });

    describe('execute', () => {
      let isConnectedMock = jest.fn();
      beforeEach(() => {
        protocol.socket.write = jest.fn();
        Object.defineProperty(protocol, '_isConnected', { get: isConnectedMock });
      });


      test('writes to socket and clears the timeout', (done) => {
        isConnectedMock.mockReturnValue(true);
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

        protocol.execute(new GetDateTimeCommand())
          .then((response) => {
            expect(protocol.socket.write).toHaveBeenNthCalledWith(1, '!dt?&');
            expect(clearTimeoutSpy).toHaveBeenCalled();
            done();
          });

        protocol.handleOnData(Buffer.from('!dt86042071200&\r\n', 'ascii'));
      });

      test('writes to socket with password', (done) => {
        isConnectedMock.mockReturnValue(true);

        protocol.execute(new GetDateTimeCommand(), 'foobar')
          .then(() => {
            expect(protocol.socket.write).toHaveBeenNthCalledWith(1, '!dt?foobar&');
            done();
          });

        protocol.handleOnData(Buffer.from('!dt86042071200&\r\n', 'ascii'));
      });

      test('throws at timeout', async () => {
        isConnectedMock.mockReturnValue(true);

        await expect(protocol.execute(new GetDateTimeCommand(), '', 1)).rejects.toThrow(expect.any(CommandTimeoutError));
      });

      test('throws when protocol is not connected', async () => {
        isConnectedMock.mockReturnValue(false);

        await expect(protocol.execute(new GetDateTimeCommand(), '', 1)).rejects.toThrow('Client is not connected to the server');
      });
    })
  });
});
