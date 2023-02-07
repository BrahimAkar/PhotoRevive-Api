// import expressLoader from './express';
import Logger from './logger';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import redisLoader from './redis';
import { Db } from 'mongodb';
import Controller from '@/utils/interfaces/controller.interface';
import config from '@/config';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async ({ expressApp }) => {
  const mongoConnection: Db = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');
  const redisConnection = redisLoader();
  Logger.info('✌️ Redis loaded and connected!');

  dependencyInjectorLoader({ mongoConnection, redisConnection });
  // expressLoader({ app: expressApp });

  Logger.info('✌️ Express loaded');
};
