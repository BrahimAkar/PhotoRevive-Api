import { default as Redis } from 'ioredis';

import config from '@/config';

export default (): Redis => {
  const client = new Redis(config.redisURL);

  client.on('connect', () => {
    // console.log('Redis client connected');
  });

  client.on('error', err => {
    console.error(`Redis error: ${err}`);
  });

  return client;
};
