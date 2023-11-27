export interface DeviceCategoryAttributes {
  /**
   * Code that identifies this category.
   *
   * This is a single character that is used in device commands
   * and is shown on the base unit when reporting events.
   */
  code: string;

  /**
   * Description for the category.
   */
  description: string;

  /**
   * Maximum number of devices supported by this category.
   */
  maxDevices: number | null;
}

/**
 * Represents a category of devices.
 */
class DeviceCategory {
  /**
   * Code that identifies this category.
   *
   * This is a single character that is used in device commands
   * and is shown on the base unit when reporting events.
   */
  public readonly code: string;

  /**
   * Description for the category.
   */
  public readonly description: string;

  /**
   * Maximum number of devices supported by this category.
   */
  public readonly maxDevices: number | null;

  constructor({ code, description, maxDevices }: DeviceCategoryAttributes) {
    this.code = code;
    this.description = description;
    this.maxDevices = maxDevices;
  }
}

export default DeviceCategory;

// Device categories
export const DC_CONTROLLER = new DeviceCategory({ code: 'c', description: 'Controller', maxDevices: 32 });
export const DC_BURGLAR = new DeviceCategory({ code: 'b', description: 'Burglar', maxDevices: 128 });
export const DC_FIRE = new DeviceCategory({ code: 'f', description: 'Fire', maxDevices: 64 });
export const DC_MEDICAL = new DeviceCategory({ code: 'm', description: 'Medical', maxDevices: 32 });
export const DC_SPECIAL = new DeviceCategory({ code: 'e', description: 'Special', maxDevices: 32 });
export const DC_BASEUNIT = new DeviceCategory({ code: 'z', description: 'Base Unit', maxDevices: null });

// List of all device categories
export const DC_ALL = [
  DC_CONTROLLER,
  DC_BURGLAR,
  DC_FIRE,
  DC_MEDICAL,
  DC_SPECIAL,
  DC_BASEUNIT
];

// Dictionary of all device categories, for lookup using the code
export const DC_ALL_LOOKUP: Record<string, DeviceCategory> = {};
for (const dc of DC_ALL) {
  DC_ALL_LOOKUP[dc.code] = dc;
}
