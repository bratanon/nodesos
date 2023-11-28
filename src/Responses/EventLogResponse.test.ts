import { DC_BASEUNIT, DC_BURGLAR, DC_CONTROLLER } from '../DeviceCategory';
import { ContactIDEventCode, ContactIDEventQualifier, IntEnum } from '../Enums';
import EventLogResponse from './EventLogResponse';

describe('EventLogResponse', () => {
  describe('constructor', () => {
    test('RFLowBattery', () => {
      const response = new EventLogResponse('ev138413010901112201260b7');
      expect(response.action).toEqual(DC_BURGLAR);
      expect(response.deviceCategory).toEqual(DC_BURGLAR);
      expect(response.eventCode).toEqual(new IntEnum(ContactIDEventCode, ContactIDEventCode.RFLowBattery));
      expect(response.eventQualifier).toEqual(new IntEnum(ContactIDEventQualifier, ContactIDEventQualifier.Event));
      expect(response.groupNumber).toBe(19);
      expect(response.lastIndex).toBe(183);
      expect(response.userId).toBeUndefined();
      expect(response.unitNumber).toBe(9);
      expect(response.dateTime).toBe('2023-11-22T01:26:00.000');
    });

    test('ACPowerLoss', () => {
      const response = new EventLogResponse('ev130100050005112201520b7');
      expect(response.action).toEqual(DC_BASEUNIT);
      expect(response.deviceCategory).toEqual(DC_BASEUNIT);
      expect(response.eventCode).toEqual(new IntEnum(ContactIDEventCode, ContactIDEventCode.ACPowerLoss));
      expect(response.eventQualifier).toEqual(new IntEnum(ContactIDEventQualifier, ContactIDEventQualifier.Event));
      expect(response.groupNumber).toBeUndefined();
      expect(response.lastIndex).toBe(183);
      expect(response.userId).toBeUndefined();
      expect(response.unitNumber).toBeUndefined();
      expect(response.dateTime).toBe('2023-11-22T01:52:00.000');
    });

    test('ArmedSTAY', () => {
      const response = new EventLogResponse('ev344160000200112201520b7');
      expect(response.action).toEqual(DC_CONTROLLER);
      expect(response.deviceCategory).toEqual(DC_CONTROLLER);
      expect(response.eventCode).toEqual(new IntEnum(ContactIDEventCode, ContactIDEventCode.ArmedSTAY));
      expect(response.eventQualifier).toEqual(new IntEnum(ContactIDEventQualifier, ContactIDEventQualifier.Restore));
      expect(response.groupNumber).toBe(96);
      expect(response.lastIndex).toBe(183);
      expect(response.userId).toBeUndefined();
      expect(response.unitNumber).toBe(2);
      expect(response.dateTime).toBe('2023-11-22T01:52:00.000');
    });

    test('AWAY', () => {
      const response = new EventLogResponse('ev140060000200112201530b7');
      expect(response.action).toEqual(DC_CONTROLLER);
      expect(response.deviceCategory).toEqual(DC_CONTROLLER);
      expect(response.eventCode).toEqual(new IntEnum(ContactIDEventCode, ContactIDEventCode.Away));
      expect(response.eventQualifier).toEqual(new IntEnum(ContactIDEventQualifier, ContactIDEventQualifier.Event));
      expect(response.groupNumber).toBe(96);
      expect(response.lastIndex).toBe(183);
      expect(response.userId).toBeUndefined();
      expect(response.unitNumber).toBe(2);
      expect(response.dateTime).toBe('2023-11-22T01:53:00.000');
    });

    test('CMSReportFail', () => {
      const response = new EventLogResponse('ev135400053405112202010b7');
      expect(response.action).toEqual(DC_BASEUNIT);
      expect(response.deviceCategory).toEqual(DC_BASEUNIT);
      expect(response.eventCode).toEqual(new IntEnum(ContactIDEventCode, ContactIDEventCode.CMSReportFail));
      expect(response.eventQualifier).toEqual(new IntEnum(ContactIDEventQualifier, ContactIDEventQualifier.Event));
      expect(response.groupNumber).toBeUndefined();
      expect(response.lastIndex).toBe(183);
      expect(response.userId).toBe(52);
      expect(response.unitNumber).toBeUndefined();
      expect(response.dateTime).toBe('2023-11-22T02:01:00.000');
    });
  });

  describe('zone', () => {
    test('Baseunit', () => {
      const response = new EventLogResponse('ev135400053405112202010b7');
      expect(response.zone).toBeUndefined();
    });
    test('Not baseunit', () => {
      const response = new EventLogResponse('ev140060000200112201530b7');
      expect(response.zone).toBe('60-02')
    });
  });
});

