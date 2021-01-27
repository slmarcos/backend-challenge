import env from '@/main/config/env'
import { RabbitMQHelper } from '@/infra/rabbitmq/helpers'
import { bindChannels, consumeChannels } from '@/main/rabbitmq'

export const connectStockService = async () => {
  try {
    const connection = await RabbitMQHelper.connect(env.stockServiceUrl!, env.stockServiceUser, env.stockServicePassword)

    connection.on('error', async () => connectStockService())
    connection.on('close', async () => connectStockService())

    await RabbitMQHelper.createChannel()
    await RabbitMQHelper.createQueue()
    await bindChannels()
    await consumeChannels()

    console.log(`[${new Date().toISOString()}]`, 'Stock service connection OK')
  } catch (error) {
    console.error(`[${new Date().toISOString()}]`, 'Error connecting to stock service:', error.message)
    setTimeout(() => {
      connectStockService()
    }, 5000)
  }
}
