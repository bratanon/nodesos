/**
 * Provides details for a property change.
 */
class PropertyChangedInfo {

  /**
   * Name of the property that was changed.
   */
  name: string;

  /**
   * The new property value.
   */
  oldValue: any;

  /**
   * The old property value.
   */
  newValue: any;

  constructor(name: string, oldValue: any, newValue: any) {
    this.name = name;
    this.oldValue = oldValue;
    this.newValue = newValue;
  }
}

export default PropertyChangedInfo;
