// import expressLoader from './express';
import Logger from './logger';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import redisLoader from './redis';
import { Db } from 'mongodb';
import firebaseLoader from './firebase';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async ({}) => {
  const mongoConnection: Db = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');
  const redisConnection = redisLoader();
  Logger.info('✌️ Redis loaded and connected!');

  const firebaseApp = await firebaseLoader();
  Logger.info('✌️ Firebase loaded and connected!');

  dependencyInjectorLoader({ mongoConnection, redisConnection, firebaseApp });

  Logger.info('✌️ Express loaded');
};
