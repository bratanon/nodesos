/* istanbul ignore file */

import { configure } from 'log4js';

configure({
  appenders: {
    console: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{ISO8601}] [%-5.5p] (%f{2}:%l:%o) %m%]',
      },
    },
    consoleErrors: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{ISO8601}] [%-5.5p] (%f{2}:%l:%o) %m%n%s%]',
      },
    },
    'trace-debug-info-warn': {
      type: 'logLevelFilter',
      appender: 'console',
      level: 'trace',
      maxLevel: 'warn',
    },
    'error-fatal': {
      type: 'logLevelFilter',
      appender: 'consoleErrors',
      level: 'error',
    },
  },
  categories: {
    default: {
      appenders: ['trace-debug-info-warn', 'error-fatal'],
      level: 'debug',
      enableCallStack: true,
    },
  },
});
