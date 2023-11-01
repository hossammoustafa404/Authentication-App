interface Config {
  app: {
    base_url: string;
    env: string;
    port: number;
  };
  client: {
    baseUrl: string;
  };
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  jwt: {
    accessToken: {
      secret: string;
      expiresIn: number;
    };
    refreshToken: {
      secret: string;
      expiresIn: number;
    };
    verifyToken: {
      secret: string;
      expiresIn: number;
    };
    resetToken: {
      secret: string;
      expiresIn: number;
    };
  };

  mailtrap: {
    apiToken: string;
  };

  outlook?: {
    user: string;
    password: string;
  };
}

export default Config;
