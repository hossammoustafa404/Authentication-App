declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      NODE_ENV: string;
      PORT: string;
      CLIENT_BASE_URL: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      ACCESS_TOKEN_SECRET: string;
      ACCESS_TOKEN_EXPIRES_IN_MINUTES: string;
      REFRESH_TOKEN_SECRET: string;
      REFRESH_TOKEN_EXPIRES_IN_DAYS: string;
      VERIFY_TOKEN_SECRET: string;
      VERIFY_TOKEN_EXPIRES_IN_HOURS: string;
      RESET_TOKEN_SECRET: string;
      RESET_TOKEN_EXPIRES_IN_HOURS: string;
      MAILTRAP_API_TOKEN: string;
      OUTLOOK_USER?: string;
      OUTLOOK_PASSWORD?: string;
    }
  }
}

export {};
