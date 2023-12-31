/**
 * Enum helper class.
 */

export type Enum = {
  [key: string]: number;
};

abstract class EnumHelper<T extends Enum> {
  readonly #flags: T;
  readonly value: number;

  protected constructor(flags: T, value: number) {
    this.#flags = flags;
    this.value = value;
  }

  protected getKeys() {
    const flagNames: (keyof T)[] = [];

    for (const key in this.#flags) {
      if (this.value & this.#flags[key]) {
        flagNames.push(key);
      }
    }

    return flagNames;
  }

  protected getKey(): keyof T | undefined {
    return Object.keys(this.#flags).find((key) => this.#flags[key] === this.value);
  }
}

export class FlagEnum<T extends Enum> extends EnumHelper<T> {
  readonly string: string | undefined;

  constructor(flags: T, value: number) {
    super(flags, value);
    this.string = this.getKeys().join('|');
  }

  has(flag: T[keyof T]) {
    return Boolean(this.value & flag);
  }
}

export class IntEnum<T extends Enum> extends EnumHelper<T> {
  readonly string: string;

  constructor(flags: T, value: number) {
    super(flags, value);
    this.string = String(this.getKey());
  }
}

/**
 * Indicates the type of LifeSOS device.
 */
export const DeviceType = Object.freeze({
  HumidSensor: 0x01,
  HumidSensor2: 0x02,
  TempSensor: 0x03,
  TempSensor2: 0x04,
  FloodDetector: 0x05,
  FloodDetector2: 0x06,
  MedicalButton: 0x08,
  LightSensor: 0x0a,
  LightDetector: 0x0b,
  InactivityReport: 0x0c,
  AnalogSensor: 0x0e,
  AnalogSensor2: 0x0f,
  RemoteController: 0x10,
  CardReader: 0x12,
  KeyPad: 0x18,
  XKeyPad: 0x19,
  SmokeDetector: 0x20,
  PressureSensor: 0x22,
  PressureSensor2: 0x23,
  CODetector: 0x25,
  CO2Sensor: 0x26,
  CO2Sensor2: 0x27,
  ACCurrentMeter: 0x28,
  ACCurrentMeter2: 0x29,
  ThreePhaseACMeter: 0x2b,
  GasDetector: 0x30,
  DoorMagnet: 0x40,
  Repeater: 0x41,
  VibrationSensor: 0x42,
  PIRSensor: 0x50,
  StatusIndicator: 0x56,
  Repeater2: 0x57,
  GlassBreakDetector: 0x60,
  RemoteSiren: 0x70,
  BaseUnit: 0x80,
  RFBell: 0x90,
  RFSW: 0xa0,
  RWSWOnTime: 0xa1,
  RFSiren: 0xc0,
  RFSirenOnTime: 0xc1,
} as const) satisfies { [key: string]: number };

export type DeviceType = (typeof DeviceType)[keyof typeof DeviceType];

/**
 * Type of event raised by a device.
 */
export const DeviceEventCode = Object.freeze({
  Button: 0x0a01,
  Away: 0x0a10,
  CheckStatus: 0x0a13,
  Disarm: 0x0a14,
  Home: 0x0a18,
  Heartbeat: 0x0a20,
  Reading: 0x0a24,
  PowerOnReset: 0x0a2a,
  BatteryLow: 0x0a30,
  Display: 0x0a33,
  Open: 0x0a40,
  Close: 0x0a48,
  Tamper: 0x0a50,
  Trigger: 0x0a58,
  Panic: 0x0a60,
} as const) satisfies { [key: string]: number };

export type DeviceEventCode = (typeof DeviceEventCode)[keyof typeof DeviceEventCode];

/**
 * Mode of operation for the base unit.
 */
export const OperationMode = Object.freeze({
  Disarm: 0x0,
  Home: 0x1,
  Away: 0x2,
  Monitor: 0x8,
} as const) satisfies { [key: string]: number };

export type OperationMode = (typeof OperationMode)[keyof typeof OperationMode];

/**
 * State of the base unit.
 */
export const BaseUnitState = Object.freeze({
  Disarm: OperationMode.Disarm,
  Home: OperationMode.Home,
  Away: OperationMode.Away,
  Monitor: OperationMode.Monitor,
  AwayExitDelay: 0x10,
  AwayEntryDelay: 0x11,
} as const) satisfies { [key: string]: number };

export type BaseUnitState = (typeof BaseUnitState)[keyof typeof BaseUnitState];

/**
 * Device Characteristics flags
 */
export const DCFlags = Object.freeze({
  Repeater: 0x80,
  BaseUnit: 0x40,
  TwoWay: 0x20,
  Supervisory: 0x10,
  RFVoice: 0x08,
  Reserved_b2: 0x04,
  Reserved_b1: 0x02,
  Reserved_b0: 0x01,
} as const) satisfies { [key: string]: number };

/**
 * Enable Status flags.
 */
export const ESFlags = Object.freeze({
  Bypass: 0x8000,
  Delay: 0x4000,
  Hour24: 0x2000,
  HomeGuard: 0x1000,
  WarningBeepDelay: 0x800,
  PreWarning: 0x800,
  AlarmSiren: 0x400,
  Bell: 0x200,
  Latchkey: 0x100,
  Inactivity: 0x100,
  Reserved_b7: 0x80,
  Reserved_b6: 0x40,
  TwoWay: 0x20,
  Supervised: 0x10,
  RFVoice: 0x8,
  HomeAuto: 0x4,
  Reserved_b1: 0x2,
  Reserved_b0: 0x1,
} as const) satisfies { [key: string]: number };

/**
 * Provides context for the type of event in a Contact ID message.
 */
export const ContactIDEventQualifier = Object.freeze({
  Event: 0x1, // New Event or Opening
  Restore: 0x3, // New Restore or Closing
  Repeat: 0x6, // Previously reported condition still present
} as const) satisfies { [key: string]: number };

export type ContactIDEventQualifier = (typeof ContactIDEventQualifier)[keyof typeof ContactIDEventQualifier];

/**
 * Category of event in a ContactID message.
 */
export const ContactIDEventCategory = Object.freeze({
  Alarm: 0x100,
  Supervisory: 0x200,
  Trouble: 0x300,
  OpenClose_Access: 0x400,
  Bypass_Disable: 0x500,
  Test_Misc: 0x600,
  Automation: 0x900,
} as const) satisfies { [key: string]: number };

export type ContactIDEventCategory = (typeof ContactIDEventCategory)[keyof typeof ContactIDEventCategory];

/**
 * Type of event indicated by a ContactID message.
 */
export const ContactIDEventCode = Object.freeze({
  // # ALARMS

  // # Medical Alarms -100
  MedicalAlarm: 0x100,
  PersonalEmergency: 0x101,
  FailToReportIn: 0x102,

  // # Fire Alarms -110
  FireAlarm: 0x110,
  SmokeAlarm: 0x111,
  Combustion: 0x112,
  WaterFlow: 0x113,
  Heat: 0x114,
  PullStation: 0x115,
  Duct: 0x116,
  Flame: 0x117,
  NearAlarm_Fire: 0x118,

  // # Panic Alarms -120
  PanicAlarm: 0x120,
  Duress: 0x121,
  Silent: 0x122,
  Audible: 0x123,
  Duress_AccessGranted: 0x124,
  Duress_EgressGranted: 0x125,

  // # Burglar Alarms -130
  BurglarAlarm: 0x130,
  Perimeter: 0x131,
  Interior: 0x132,
  Hour24_Burglar: 0x133,
  EntryExit: 0x134,
  DayNight: 0x135,
  Outdoor: 0x136,
  BurglarSensorTampered: 0x137,
  NearAlarm_Burglar: 0x138,
  IntrusionVerifier: 0x139,

  // # General Alarm -140
  GeneralAlarm: 0x140,
  PollingLoopOpen_Alarm: 0x141,
  PollingLoopShort_Alarm: 0x142,
  ExpansionModuleFailure_Alarm: 0x143,
  KeypadSensorTampered: 0x144,
  ExpansionModuleTamper: 0x145,
  SilentBurglary: 0x146,
  SensorSupervisionFailure: 0x147,

  // # 24 Hour Non-Burglary - 150 and 160
  Hour24NonBurglary: 0x150,
  GasDetected: 0x151,
  Refrigeration: 0x152,
  LossOfHeat: 0x153,
  WaterLeakage: 0x154,
  FoilBreak: 0x155,
  DayTrouble: 0x156,
  LowBottledGasLevel: 0x157,
  HighTemp: 0x158,
  LowTemp: 0x159,
  LossOfAirFlow: 0x161,
  CarbonMonoxideDetected: 0x162,
  TankLevel: 0x163,
  HighLimitAlarm: 0x168,
  LowLimitAlarm: 0x169,

  // # SUPERVISORY

  // # Fire Supervisory - 200 and 210
  FireSupervisory: 0x200,
  LowWaterPressure: 0x201,
  LowCO2: 0x202,
  GateValveSensor: 0x203,
  LowWaterLevel: 0x204,
  PumpActivated: 0x205,
  PumpFailure: 0x206,

  // # TROUBLES

  // # System Troubles -300 and 310
  SystemTrouble: 0x300,
  ACPowerLoss: 0x301,
  BaseUnitLowBattery: 0x302,
  RAMChecksumBad: 0x303,
  ROMChecksumBad: 0x304,
  SystemReset: 0x305,
  PanelProgrammingChanged: 0x306,
  SelfTestFailure: 0x307,
  SystemShutdown: 0x308,
  BatteryTestFailure: 0x309,
  GroundFault: 0x310,
  BatteryMissingDead: 0x311,
  PowerSupplyOvercurrent: 0x312,
  EngineerReset: 0x313,

  // # Sounder / Relay Troubles -320
  SounderRelay: 0x320,
  Bell1: 0x321,
  Bell2: 0x322,
  AlarmRelay: 0x323,
  TroubleRelay: 0x324,
  ReversingRelay: 0x325,
  NotificationApplianceCkt3: 0x326,
  NotificationApplianceCkt4: 0x327,

  // # System Peripheral Trouble -330 and 340
  SystemPeripheralTrouble: 0x330,
  PollingLoopOpen_Trouble: 0x331,
  PollingLoopShort_Trouble: 0x332,
  ExpansionModuleFailure_Trouble: 0x333,
  RepeaterFailure: 0x334,
  LocalPrinterOutOfPaper: 0x335,
  LocalPrinterFailure: 0x336,
  ExpModuleDCLoss: 0x337,
  ExpModuleLowBatt: 0x338,
  ExpModuleReset: 0x339,
  ExpModuleTamper: 0x341,
  ExpModuleACLoss: 0x342,
  ExpModuleSelfTestFail: 0x343,
  RFReceiverJamDetect: 0x344,

  // # Communication Troubles -350 and 360
  CommunicationTrouble: 0x350,
  Telco1Fault: 0x351,
  Telco2Fault: 0x352,
  LongRangeRadioXmitterFault: 0x353,
  CMSReportFail: 0x354,
  LossOfRadioSupervision: 0x355,
  LossOfCMSPolling: 0x356,
  LongRangeRadioVSWRProblem: 0x357,

  // # Protection Loop -370
  ProtectionLoop: 0x370,
  ProtectionLoopOpen: 0x371,
  ProtectionLoopShort: 0x372,
  FireTrouble: 0x373,
  ExitErrorAlarm: 0x374,
  PanicZoneTrouble: 0x375,
  HoldUpZoneTrouble: 0x376,
  SwingerTrouble: 0x377,
  CrossZoneTrouble: 0x378,

  // # Sensor Trouble -380
  SensorTrouble: 0x380,
  LossOfSupervision_RF: 0x381,
  LossOfSupervision_RPM: 0x382,
  SensorTamper: 0x383,
  RFLowBattery: 0x384,
  SmokeDetectorHiSensitivity: 0x385,
  SmokeDetectorLowSensitivity: 0x386,
  IntrusionDetectorHiSensitivity: 0x387,
  IntrusionDetectorLowSensitivity: 0x388,
  SensorSelfTestFailure: 0x389,
  SensorWatchTrouble: 0x391,
  DriftCompensationError: 0x392,
  MaintenanceAlert: 0x393,

  // # OPEN/CLOSE/REMOTE ACCESS

  // # Open/Close -400, 440,450
  Away: 0x400,
  OCByUser: 0x401,
  GroupOC: 0x402,
  AutomaticOC: 0x403,
  LateToOC: 0x404,
  DeferredOC: 0x405,
  Cancel: 0x406,
  RemoteArmDisarm: 0x407,
  Away_QuickArm: 0x408,
  KeyswitchOC: 0x409,

  ArmedSTAY: 0x441,
  KeyswitchArmedSTAY: 0x442,

  ExceptionOC: 0x450,
  EarlyOC: 0x451,
  LateOC: 0x452,
  FailedToOpen: 0x453,
  FailedToClose: 0x454,
  AutoArmFailed: 0x455,
  PartialArm: 0x456,
  ExitError: 0x457,
  UserOnPremises: 0x458,
  RecentClose: 0x459,
  WrongCodeEntry: 0x461,
  LegalCodeEntry: 0x462,
  ReArmAfterAlarm: 0x463,
  AutoArmTimeExtended: 0x464,
  PanicAlarmReset: 0x465,
  ServiceOnOffPremises: 0x466,

  // # Remote Access -410
  CallbackRequestMade: 0x411,
  SuccessfulDownloadAccess: 0x412,
  UnsuccessfulAccess: 0x413,
  SystemShutdownCommandReceived: 0x414,
  DialerShutdownCommandReceived: 0x415,
  SuccessfulUpload: 0x416,

  // # Access control -420,430
  AccessDenied: 0x421,
  AccessReportByUser: 0x422,
  ForcedAccess: 0x423,
  EgressDenied: 0x424,
  EgressGranted: 0x425,
  AccessDoorProppedOpen: 0x426,
  AccessPointDoorStatusMonitorTrouble: 0x427,
  AccessPointRequestToExitTrouble: 0x428,
  AccessProgramModeEntry: 0x429,
  AccessProgramModeExit: 0x430,
  AccessThreatLevelChange: 0x431,
  AccessRelayTriggerFail: 0x432,
  AccessRTEShunt: 0x433,
  AccessDSMShunt: 0x434,

  // # BYPASSES / DISABLES

  // # System Disables -500 and 510
  AccessReaderDisable: 0x501,

  // # Sounder / Relay Disables -520
  SounderRelayDisable: 0x520,
  Bell1Disable: 0x521,
  Bell2Disable: 0x522,
  AlarmRelayDisable: 0x523,
  TroubleRelayDisable: 0x524,
  ReversingRelayDisable: 0x525,
  NotificationApplianceCkt3Disable: 0x526,
  NotificationApplianceCkt4Disable: 0x527,

  // # System Peripheral Disables -530 and 540
  ModuleAdded: 0x531,
  ModuleRemoved: 0x532,

  // # Communication Disables -550 and 560
  DialerDisabled: 0x551,
  RadioTransmitterDisabled: 0x552,
  RemoteUploadDownloadDisabled: 0x553,

  // # Bypasses -570
  ZoneSensorBypass: 0x570,
  FireBypass: 0x571,
  Hour24ZoneBypass: 0x572,
  Disarm: 0x573,
  Home: 0x574,
  SwingerBypass: 0x575,
  AccessZoneShunt: 0x576,
  AccessPointBypass: 0x577,

  // # TEST / MISC.

  // # Test/Misc. -600, 610
  ManualTriggerTestReport: 0x601,
  PeriodicTestReport: 0x602,
  PeriodicRFTransmission: 0x603,
  FireTest: 0x604,
  StatusReportToFollow: 0x605,
  TwoWayVoice: 0x606,
  WalkTestMode: 0x607,
  PeriodicTest_SystemTroublePresent: 0x608,
  VideoXmitterActive: 0x609,
  PointTestedOK: 0x611,
  PointNotTested: 0x612,
  IntrusionZoneWalkTested: 0x613,
  FireZoneWalkTested: 0x614,
  PanicZoneWalkTested: 0x615,
  ServiceRequest: 0x616,
  MotionStop: 0x617,
  Trigger_Monitor: 0x618,
  MonitorMode: 0x619,

  // # Event Log -620
  EventLogReset: 0x621,
  EventLog50PctFull: 0x622,
  EventLog90PctFull: 0x623,
  EventLogOverflow: 0x624,
  TimeDateReset: 0x625,
  TimeDateInaccurate: 0x626,
  ProgramModeEntry: 0x627,
  ProgramModeExit: 0x628,
  Hour32EventLogMarker: 0x629,

  // # Scheduling -630
  ScheduleChange: 0x630,
  ExceptionScheduleChange: 0x631,
  AccessScheduleChange: 0x632,

  // # Personnel Monitoring -640
  InactivityAlarm: 0x641,
  LatchKeySupervision: 0x642,
  DoorOpen_Monitor: 0x648,
  DoorClose_Monitor: 0x649,

  // # Misc. -650
  ReservedForAdemcoUse: 0x651,
  ReservedForAdemcoUse2: 0x652,
  ReservedForAdemcoUse3: 0x653,
  SystemInactivity: 0x654,
  SystemClear: 0x659,

  SwitchOnOff: 0x901,
  HighLimitOperation: 0x912,
  LowLimitOperation: 0x913,
} as const) satisfies { [key: string]: number };

export type ContactIDEventCode = (typeof ContactIDEventCode)[keyof typeof ContactIDEventCode];

export const MessageType = Object.freeze({
  Preferred: 0x18,
  Optional: 0x98,
} as const) satisfies { [key: string]: number };

export type MessageType = (typeof MessageType)[keyof typeof MessageType];
