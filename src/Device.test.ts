import * as log4js from 'log4js';
import PropertyChangedInfo from './PropertyChangedInfo';

import Device from './Device';
import DeviceInfoResponse from './Responses/DeviceInfoResponse';
import DeviceSettingsResponse from './Responses/DeviceSettingsResponse';
import DeviceEvent from './DeviceEvent';
import { DeviceEventCode, IntEnum } from './Enums';

class MockedClass extends DeviceSettingsResponse {
  constructor(text: string) {
    super(text);
  }
}

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

describe('Device', () => {

  test('constructor', () => {
    const response = new DeviceInfoResponse('ib0050f01a7a0010e41102141000005b05');
    const device = new Device(response);

    expect(device.deviceId).toEqual(response.deviceId);
    expect(device.category).toEqual(response.deviceCategory);
    expect(device.messageAttribute).toEqual(response.messageAttribute);
    expect(device.type).toEqual(response.deviceType);
    expect(device.characteristics).toEqual(response.deviceCharacteristics);
  });

  describe('handleResponse', () => {
    test('with DeviceInfoResponse', () => {
      const response = new DeviceInfoResponse('ib0050f01a7a0010e41102141000005b05');
      const device = new Device(response);

      // device.handleResponse(response) is executed in the constructor
      // for DeviceInfoResponse responses.
      expect(device.enableStatus).toEqual(response.enableStatus);
      expect(device.groupNumber).toEqual(response.groupNumber);
      expect(device.isClosed).toEqual(response.isClosed);

      expect(device.rssiDb).toEqual(response.RSSIDb);
      expect(device.rssiBars).toEqual(response.RSSIBars);
      expect(device.unitNumber).toEqual(response.unitNumber);
      expect(device.zone).toEqual(response.zone);
    });

    test('with DeviceSettingsResponse', () => {
      const device = new Device(new DeviceInfoResponse('ib0050f01a7a0010e41102141000005b05'));
      const response = new MockedClass('ibs0511021410');

      device.handleResponse(response);

      expect(device.enableStatus).toEqual(response.enableStatus);
      expect(device.groupNumber).toEqual(response.groupNumber);
      expect(device.unitNumber).toEqual(response.unitNumber);
      expect(device.zone).toEqual(response.zone);
    });
  });

  describe('handleDeviceEvent', () => {
    let device: Device;
    let deviceEvent: DeviceEvent;
    let eventCodeMock: jest.Mock;

    beforeEach(() => {
      deviceEvent = new DeviceEvent('MINPIC=0000000000000000000000');
      device = new Device(new DeviceInfoResponse(''));

      eventCodeMock = jest.fn();
      Object.defineProperty(deviceEvent, 'eventCode', { get: eventCodeMock });
    });

    describe('isClosed', () => {
      let setIsClosedMock = jest.fn();
      beforeEach(() => {
        Object.defineProperty(device, '_isClosed', { set: setIsClosedMock });
      });

      test('when event code is OPEN', () => {
        eventCodeMock.mockReturnValue(new IntEnum(DeviceEventCode, DeviceEventCode.Open));

        device.handleDeviceEvent(deviceEvent);

        expect(setIsClosedMock).toHaveBeenNthCalledWith(1, false);
      });

      test('when event code is CLOSE', () => {
        eventCodeMock.mockReturnValue(new IntEnum(DeviceEventCode, DeviceEventCode.Close));

        device.handleDeviceEvent(deviceEvent);

        expect(setIsClosedMock).toHaveBeenNthCalledWith(1, true);
      });
    });

    test('sets RSSI props', () => {
      eventCodeMock.mockReturnValue(new IntEnum(DeviceEventCode, DeviceEventCode.BatteryLow));
      const device = new Device(new DeviceInfoResponse(''));
      const setRssiBarsMock = jest.fn();
      const setRssiDbMock = jest.fn();
      Object.defineProperty(device, '_rssiBars', { set: setRssiBarsMock });
      Object.defineProperty(device, '_rssiDb', { set: setRssiDbMock });

      const deviceEventRSSIBarsGetMock = jest
        .spyOn(DeviceEvent.prototype, 'RSSIBars', 'get');
      const deviceEventRSSIDbGetMock = jest
        .spyOn(DeviceEvent.prototype, 'RSSIDb', 'get');

      deviceEventRSSIBarsGetMock.mockReturnValue(1);
      deviceEventRSSIDbGetMock.mockReturnValue(2);

      device.handleDeviceEvent(deviceEvent);

      expect(setRssiBarsMock).toHaveBeenNthCalledWith(1, 1);
      expect(setRssiDbMock).toHaveBeenNthCalledWith(1, 2);
    });

    describe('onEvent', () => {
      test('Calls onEvent', () => {
        eventCodeMock.mockReturnValue(new IntEnum(DeviceEventCode, DeviceEventCode.BatteryLow));

        const device = new Device(new DeviceInfoResponse(''));
        const onEventMock = jest.fn();
        device.onEvent = onEventMock;

        device.handleDeviceEvent(deviceEvent);

        expect(onEventMock).toHaveBeenNthCalledWith(1, device, deviceEvent.eventCode.value);
      });

      test('Catches errors from onEvent', () => {
        eventCodeMock.mockReturnValue(new IntEnum(DeviceEventCode, DeviceEventCode.BatteryLow));
        const device = new Device(new DeviceInfoResponse(''));
        device.onEvent = () => {
          throw new Error();
        };
        device.handleDeviceEvent(deviceEvent);

        expect(log4js.getLogger().error).toHaveBeenCalledWith('Unhandled exception in onEvent callback');
      });
    });
  });

  describe('notifyChange', () => {
    let device: Device;
    let response: DeviceSettingsResponse;
    const onPropertiesChangedMock = jest.fn();

    beforeEach(() => {
      device = new Device(new DeviceInfoResponse('ib0050f01a7a0010e41102141000005b05'));
      response = new MockedClass('ibs0512031410');
      device.onPropertiesChanged = onPropertiesChangedMock;
    });

    test('calls onPropertiesChanged when defined', () => {
      device.handleResponse(response);

      expect(onPropertiesChangedMock).toHaveBeenCalledWith(device, new PropertyChangedInfo('groupNumber', 17, 18));
      expect(onPropertiesChangedMock).toHaveBeenCalledWith(device, new PropertyChangedInfo('unitNumber', 2, 3));
      expect(onPropertiesChangedMock).toHaveBeenCalledWith(device, new PropertyChangedInfo('zone', '11-02', '12-03'));
    });

    test('notifyChange catches errors from onPropertiesChanged callbacks', () => {
      onPropertiesChangedMock.mockImplementation(() => {
        throw new Error();
      });
      device.handleResponse(response);

      expect(onPropertiesChangedMock).toHaveBeenCalledWith(expect.any(Device), expect.any(PropertyChangedInfo));
      expect(log4js.getLogger().error).toHaveBeenCalledWith('Unhandled exception in onPropertiesChanged callback');
    });
  });
});

