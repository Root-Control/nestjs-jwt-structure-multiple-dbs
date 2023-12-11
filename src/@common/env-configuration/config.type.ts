type EnvConfiguration = {
  port: number;
  jwt: JwtConfig;
  db: DbConfig;
};

type JwtConfig = {
  privateKey: string;
  publicKey: string;
  ttl: number;
};

type DbConfig = {
  connectionString: string;
};

export { EnvConfiguration, DbConfig, JwtConfig };
