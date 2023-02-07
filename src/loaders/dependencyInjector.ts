import { Container } from 'typedi';
import LoggerInstance from './logger';
import { Connection } from 'mongoose';
import { Redis } from 'ioredis';

export default ({
  mongoConnection,
  redisConnection,
}: {
  mongoConnection: Connection;
  redisConnection: Redis;
}): void => {
  try {
    Container.set('logger', LoggerInstance);

    LoggerInstance.info('✌️ Logger injected into container');

    Container.set('mongoConnection', mongoConnection);

    LoggerInstance.info('✌️ MongoDB Connection injected into container');

    Container.set('redis', redisConnection);

    LoggerInstance.info('✌️ Redis Connection injected into container');
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
