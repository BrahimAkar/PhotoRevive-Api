// import { default as Redis } from 'ioredis';
import { Redis } from 'ioredis';
import 'cross-fetch/polyfill';

import config from '@/config';

export default (): Redis => {
  const client = new Redis(config.redisURL);

  return client;
};
