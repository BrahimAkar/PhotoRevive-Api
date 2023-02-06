import expressLoader from './express';
import Logger from './logger';
import dependencyInjectorLoader from './dependencyInjector';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async ({ expressApp }) => {
  await dependencyInjectorLoader({});
  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
