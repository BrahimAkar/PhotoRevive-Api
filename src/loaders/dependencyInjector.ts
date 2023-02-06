/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from 'typedi';
import LoggerInstance from './logger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export default ({}: {}) => {
  try {
    Container.set('logger', LoggerInstance);

    LoggerInstance.info('✌️ Logger injected into container');

    return {};
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
