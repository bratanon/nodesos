/**
 * Provides details for a property change.
 */
// @TODO: Implement generics for values.
class PropertyChangedInfo {
  /**
   * Name of the property that was changed.
   */
  name: string;

  /**
   * The new property value.
   */
  oldValue: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * The old property value.
   */
  newValue: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  constructor(name: string, oldValue: any, newValue: any) {
    this.name = name;
    this.oldValue = oldValue;
    this.newValue = newValue;
  }
}

export default PropertyChangedInfo;
