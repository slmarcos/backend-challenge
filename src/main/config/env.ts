import dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/db-test',
  port: process.env.PORT ?? 3011,

  stockServiceUrl: process.env.STOCK_SERVICE_URL ?? 'amqp://localhost:5672/',
  stockServiceUser: process.env.STOCK_SERVICE_USER ?? 'guest',
  stockServicePassword: process.env.STOCK_SERVICE_PASSWORD ?? 'guest'
}
