import express from 'express';
import 'reflect-metadata'; // We need this in order to use @Decorators
// import loader
import FixerController from './api/resources/fixer/fixer.controller';
import SimpleController from './api/resources/simple/simple.controller';
import { App } from './loaders/express';
import validateEnv from './utils/validateEnv';

validateEnv(); // validate the environment variables before starting the server (see utils/validateEnv.ts)

async function startServer() {
  const app = express();
  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  await require('./loaders').default({ expressApp: app });
  new App([new SimpleController(), new FixerController()], Number(process.env.PORT), app).listen();
}

startServer();
