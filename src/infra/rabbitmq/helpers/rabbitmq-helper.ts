import { Connection, credentials, connect, Channel } from 'amqplib'
import { Replies } from 'amqplib/properties'

export const RabbitMQHelper = {
  connection: null as Connection | null,
  channel: null as Channel | null,
  assertQueue: null as Replies.AssertQueue | null,

  credentials (username: string, password: string) {
    return credentials.plain(username, password)
  },

  async connect (url: string, username: string, password: string) {
    const credentials = this.credentials(username, password)
    this.connection = await connect(url, { credentials })
  },

  async createChannel () {
    if (this.connection) {
      const channel = await this.connection.createChannel()
      await channel?.assertExchange('stock', 'direct', { durable: true })
      this.channel = channel
    }
  },

  async createQueue () {
    if (this.channel) {
      this.assertQueue = await this.channel.assertQueue('', { exclusive: true })
    }
  }
}
