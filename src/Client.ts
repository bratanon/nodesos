import { Protocol } from './Protocol';

/**
 * Provides connectivity to a LifeSOS ethernet adapter that is configured
 * in TCP Server mode.
 */
class Client extends Protocol {
  /**
   * @inheritDoc
   */
  readonly host: string | undefined;

  /**
   * @inheritDoc
   */
  readonly port: number;

  constructor(port: number, host?: string) {
    super();
    this.host = host;
    this.port = port;
  }

  /**
   * Opens connection to the LifeSOS ethernet interface.
   */
  async open(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.connect({ port: this.port, host: this.host });

      this.socket.once('connect', () => {
        resolve();
      });

      this.socket.once('error', (err) => {
        reject(err);
      });
    });
  }

  /**
   * Close connection to the LifeSOS ethernet interface.
   */
  async close(): Promise<void> {
    return new Promise((resolve) => {
      this.socket.end();

      this.socket.once('close', () => {
        resolve();
      });
    });
  }
}

export default Client;
