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
    // https://blog.logrocket.com/error-handling-node-js/
    // const fs = require('fs');
    // const util = require('util');
    //
    // const readFile = util.promisify(fs.readFile);
    //
    // readFile('/home/Kedar/node.txt')
    //   .then((result) => console.log(result))
    //   .catch((err) => console.error(err));

    // @TODO: Resolve in callback? https://nodejs.org/api/util.html#util_util_promisify_original
    this.socket.connect({ port: this.port, host: this.host });

    return new Promise((resolve, reject) => {
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
    this.socket.end();

    return new Promise((resolve) => {
      this.socket.once('close', () => {
        resolve();
      });

      // @TODO: Handle timeout / error?
    });
  }
}

export default Client;
