import { getString } from '../utilities/utils';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  postgres: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    privateKey: getString(process.env.JWT_PRIVATE_KEY || ''),
    publicKey: getString(process.env.JWT_PUBLIC_KEY || ''),
    ttl: 5000,
  },
});
