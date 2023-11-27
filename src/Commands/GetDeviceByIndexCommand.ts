import { toAsciiHex } from '../Util';
import DeviceCategory from '../DeviceCategory';
import { ACTION_GET, CMD_DEVBYIDX_PREFIX } from '../Const';
import Command from '../Command';

/**
 * Get a device using the specified category and index.
 */
class GetDeviceByIndexCommand extends Command {
  /**
   * Category for the device.
   */
  readonly deviceCategory: DeviceCategory;

  /**
   * Index of device within the category (also known as memory address).
   */
  readonly index: number;

  constructor(deviceCategory: DeviceCategory, index: number) {
    super();
    this.deviceCategory = deviceCategory;
    this.index = index;
  }

  /**
   * @inheritDoc
   */
  get action(): string {
    return ACTION_GET;
  }

  /**
   * @inheritDoc
   */
  get args() {
    return toAsciiHex(this.index, 2);
  }

  /**
   * @inheritDoc
   */
  get name(): string {
    return CMD_DEVBYIDX_PREFIX + this.deviceCategory.code;
  }
}

export default GetDeviceByIndexCommand;
