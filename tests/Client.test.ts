import Client from '../src/Client';

describe('Client', () => {
  let client: Client;

  beforeEach(() => {
    client = new Client(8080, '120.0.0.1');
    client.socket.connect = jest.fn();
  });

  test('constructor', () => {
    expect(client.port).toBe(8080);
    expect(client.host).toBe('120.0.0.1');
  });

  describe('open', () => {
    test('success', async () => {
      const connectionPromise = client.open();
      client.socket.emit('connect');

      await expect(connectionPromise).resolves.toBeUndefined();
    });

    test('failure', async () => {
      const connectionPromise = client.open();
      client.socket.emit('error');

      await expect(connectionPromise).rejects.toBeUndefined();
    });
  });

  test('close', async () => {
    client.socket.end = jest.fn();
    const closePromise = client.close();
    client.socket.emit('close');

    await expect(closePromise).resolves.toBeUndefined();
  });
});
