import dotenv from 'dotenv';

// The  NODE_ENV variable is set to  'development'  by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file 😳!, please create one.");
}

export default {
  /**
   * Port to run the server on
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * Database url and name
   */
  databaseURL: process.env.MONGODB_URI_FULL,
  databaseName: process.env.MONGODB_DB_NAME,

  /**
   * JWT secret for signing tokens
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,

  /**
   * winston logger config
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * Agenda.js config
   */
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },

  /**
   * Agendash config
   */
  agendash: {
    user: process.env.AGENDASH_USER,
    password: process.env.AGENDASH_PASSWORD,
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api/v1',
  },
  /**
   * Mailgun credentials for sending emails
   */
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    apiUsername: process.env.MAILGUN_USERNAME,
    domain: process.env.MAILGUN_DOMAIN,
  },
};
