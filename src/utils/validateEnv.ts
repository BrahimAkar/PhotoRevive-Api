import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    MONGODB_URI_FULL: str(),
    PORT: port({ default: 3000 }),
    JWT_SECRET: str(),
    REPLICATE_API_KEY: str(),
  });
}

export default validateEnv;
