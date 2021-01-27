import { Controller } from '@/presentation/protocols'
import { ConsumeMessage } from 'amqplib'

export const adaptConsumeMessage = (controller: Controller) => {
  return async (message: ConsumeMessage | null) => {
    if (message) {
      const request = {
        action: message.fields.routingKey,
        content: message?.content.toString().replace(/"/g, '')
      }
      await controller.handle(request)
    }
  }
}
