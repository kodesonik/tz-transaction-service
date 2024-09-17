import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongoDb: {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10) || 5432,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    dbname: process.env.MONGO_DBNAME,
  },
  redisDb: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
    user: process.env.REDIS_USER,
    db: parseInt(process.env.REDIS_DB, 10),
  },
  googleMap: {
    key: process.env.GOOGLE_MAP_KEY,
  },
  auth: {
    maxLoggedInDevices: parseInt(process.env.MAX_LOGGED_IN_DEVICES, 10) || 1,
  },
  authenticationService: {
    options: {
      host: process.env.AUTHENTICATION_SERVICE_HOST,
      port: process.env.AUTHENTICATION_SERVICE_PORT,
    },
    transport: Transport.TCP,
  },
  messagingService: {
    options: {
      host: process.env.MESSAGING_SERVICE_HOST,
      port: process.env.MESSAGING_SERVICE_PORT,
    },
    transport: Transport.TCP,
  },
});
