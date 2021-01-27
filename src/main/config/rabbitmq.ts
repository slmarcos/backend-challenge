import env from '@/main/config/env'
import { RabbitMQHelper } from '@/infra/rabbitmq/helpers'
import { bindChannels, consumeChannels } from '@/main/rabbitmq'

export default async () => {
  return RabbitMQHelper.connect(env.stockServiceUrl!, env.stockServiceUser, env.stockServicePassword)
    .then(async () => RabbitMQHelper.createChannel())
    .then(async () => RabbitMQHelper.createQueue())
    .then(async () => bindChannels())
    .then(async () => consumeChannels())
}
