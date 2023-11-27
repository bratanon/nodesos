import { ContactIDEventCategory, ContactIDEventCode, ContactIDEventQualifier, IntEnum } from './Enums';
import { DC_BASEUNIT, DC_BURGLAR } from './DeviceCategory';
import ContactId from './ContactId';

describe('ContactID', () => {
  describe('constructor', () => {
    test('with BaseUnit PeriodicTestReport', () => {
      const contactId = new ContactId('1ac3181602005006');
      expect(contactId.accountNumber).toEqual(6851);
      expect(contactId.checksum).toEqual(6);
      expect(contactId.deviceCategory).toEqual(DC_BASEUNIT);
      expect(contactId.eventCategory).toEqual(new IntEnum(ContactIDEventCategory, ContactIDEventCategory.Test_Misc));
      expect(contactId.eventCode).toEqual(new IntEnum(ContactIDEventCode, ContactIDEventCode.PeriodicTestReport));
      expect(contactId.eventQualifier).toEqual(new IntEnum(ContactIDEventQualifier, ContactIDEventQualifier.Event));
      expect(contactId.groupNumber).toBeUndefined();
      expect(contactId.messageType).toEqual(24);
      expect(contactId.unitNumber).toBeUndefined();
      expect(contactId.userId).toBeUndefined();
    });

    test('with Burglar RFLowBattery', () => {
      const contactId = new ContactId('1ac318138403110e');
      expect(contactId.accountNumber).toEqual(6851);
      expect(contactId.checksum).toEqual(14);
      expect(contactId.deviceCategory).toEqual(DC_BURGLAR);
      expect(contactId.eventCategory).toEqual(new IntEnum(ContactIDEventCategory, ContactIDEventCategory.Trouble));
      expect(contactId.eventCode).toEqual(new IntEnum(ContactIDEventCode, ContactIDEventCode.RFLowBattery));
      expect(contactId.eventQualifier).toEqual(new IntEnum(ContactIDEventQualifier, ContactIDEventQualifier.Event));
      expect(contactId.groupNumber).toEqual(3);
      expect(contactId.messageType).toEqual(24);
      expect(contactId.unitNumber).toEqual(16);
      expect(contactId.userId).toBeUndefined();
    });

    // @TODO: See if we can get a contact ID with a 'zoneUser'. MAybe when switching alarm state with controller.
    // test('with ??????', () => {
    //   const contactId = new ContactId('1ac318138403110e');
    //   expect(contactId.accountNumber).toEqual(6851);
    //   expect(contactId.checksum).toEqual(14);
    //   expect(contactId.deviceCategory).toEqual(DC_BURGLAR);
    //   expect(contactId.eventCategory).toEqual(new IntEnum(ContactIDEventCategory, ContactIDEventCategory.Trouble));
    //   expect(contactId.eventCode).toEqual(new IntEnum(ContactIDEventCode, ContactIDEventCode.RFLowBattery));
    //   expect(contactId.eventQualifier).toEqual(new IntEnum(ContactIDEventQualifier, ContactIDEventQualifier.Event));
    //   expect(contactId.groupNumber).toEqual(3);
    //   expect(contactId.messageType).toEqual(24);
    //   expect(contactId.unitNumber).toEqual(16);
    //   expect(contactId.userId).toEqual(??);
    // });

    test('fails when given text is not 16 chars long', () => {
      expect(() => new ContactId('123456')).toThrow('ContactID message length is invalid.');
    });

    test('fails when checksum can not be verified.', () => {
      expect(() => new ContactId('1234567890abcdef')).toThrow('ContactID message checksum failure.');
    });

    test('fails when the message type is invalid', () => {
      expect(() => new ContactId('1ac317138403110f')).toThrow('ContactID message type (23) is invalid.');
    });
  });

  describe('zone', () => {
    test('Baseunit', () => {
      const response = new ContactId('1ac3181602005006');
      expect(response.zone).toBeUndefined();
    });
    test('Not baseunit', () => {
      const response = new ContactId('1ac318138403110e');
      expect(response.zone).toBe('03-10')
    });
  });
});


