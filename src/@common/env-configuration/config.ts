import { getString } from '../utilities/utils';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  db: {
    connectionString: getString(process.env.DB_CONNECTION),
  },
  jwt: {
    privateKey: getString(process.env.JWT_PRIVATE_KEY || ''),
    publicKey: getString(process.env.JWT_PUBLIC_KEY || ''),
    ttl: 5000,
  },
});
