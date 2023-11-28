import Client from './Client';

describe('Client', () => {
  test('constructor', () => {
    const client = new Client(8080);
    expect(client.port).toBe(8080);
  });

  describe('open', () => {
    test('success', (done) => {
      const client = new Client(8080);
      client.socket.connect = jest.fn();

      client.open().then(done);

      client.socket.emit('connect');
    });

    test('failure', (done) => {
      const client = new Client(1324);
      client.socket.connect = jest.fn();

      client.open().catch(() => done());

      client.socket.emit('error', new Error());
    });
  });

  test('close', (done) => {
    const client = new Client(8080);
    client.socket.connect = jest.fn();

    client.close().then(() => done());

    client.socket.emit('close');
  });
});


