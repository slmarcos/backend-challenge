export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/backend-delivery',
  port: process.env.PORT ?? 3010
}
