import { adaptConsumeMessage } from '@/main/adapters'
import { makeUpdateProductStockController } from '@/main/factories'
import { RabbitMQHelper } from '@/infra/rabbitmq/helpers'

export const bindChannels = async () => {
  const EXCHANGE_STOCK = 'stock'
  const ROUTE_DECREMENTED = 'decremented'
  const ROUTE_INCREMENTED = 'incremented'

  const queue = RabbitMQHelper.assertQueue?.queue!
  await RabbitMQHelper.channel?.bindQueue(queue, EXCHANGE_STOCK, ROUTE_DECREMENTED)
  await RabbitMQHelper.channel?.bindQueue(queue, EXCHANGE_STOCK, ROUTE_INCREMENTED)
}

export const consumeChannels = async () => {
  const queue = RabbitMQHelper.assertQueue?.queue!
  await RabbitMQHelper.channel?.consume(queue, adaptConsumeMessage(makeUpdateProductStockController()))
}
