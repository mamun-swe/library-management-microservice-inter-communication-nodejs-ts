
import { v4 as uuidv4 } from "uuid"
import client, { Channel, Connection, ConsumeMessage } from "amqplib"
const CONN_URL = process.env.AMQP_URL

let channel: Channel

export const rabbitMQService = async () => {

    /* Create connection */
    const connection: Connection = await client.connect(`${CONN_URL}`)
    if (connection) console.log("RabbitMQ connected.")

    /* Create channel */
    channel = await connection.createChannel()
}

/* Publish message to queue */
export const publishToQueue = async (queueName: string, data: any) => {

    const q = await channel.assertQueue(queueName)
    await channel.sendToQueue(queueName, Buffer.from(data), {
        replyTo: q.queue,
        correlationId: uuidv4()
    })
}