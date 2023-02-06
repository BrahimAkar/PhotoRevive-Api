import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '@/config';

// set strictQuery
mongoose.set('strictQuery', true);

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL, {
    dbName: config.databaseName,
  });
  return connection.connection.db as Db;
};
