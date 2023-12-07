type EnvConfiguration = {
  port: number;
  postgres: PostgresConfig;
  jwt: JwtConfig;
};

type JwtConfig = {
  privateKey: string;
  publicKey: string;
  ttl: number;
};

type PostgresConfig = {
  host: string;
  port: number;
  username: string;
  database: string;
  password: string;
};

export { EnvConfiguration, PostgresConfig, JwtConfig };
