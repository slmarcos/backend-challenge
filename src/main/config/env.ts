export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/backend-delivery',
  port: process.env.PORT ?? 3010,

  stockServiceUrl: process.env.STOCK_SERVICE_USER ?? 'amqp://localhost:5672/',
  stockServiceUser: process.env.STOCK_SERVICE_USER ?? 'guest',
  stockServicePassword: process.env.STOCK_SERVICE_PASSWORD ?? 'guest'
}
