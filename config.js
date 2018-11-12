const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
  app: {
    PORT: 8000,
    SESSION_SECRET: 'gawdIsGreat',
    WEB_TOKEN_SECRET: 'gawdIsGreat',
    jwt_expiry_time: '12h',
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'test',
  },
  api: {
    facebook: '',
    google: '',
  },
};

const prod = {
  app: {
    port: 3000,
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'test',
  },
};

const config = {
  dev,
  prod,
};

export default config[env];
