import expressLoader from './express';
import Logger from './logger';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import redisLoader from './redis';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');
  const redisConnection = await redisLoader();
  Logger.info('✌️ Redis loaded and connected!');
  await dependencyInjectorLoader({ mongoConnection, redisConnection });
  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
