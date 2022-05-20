
import client, { Channel, Connection, ConsumeMessage } from "amqplib"
const CONN_URL = process.env.AMQP_URL

let channel: Channel

const start = async () => {

    /* Create connection */
    const connection: Connection = await client.connect(`${CONN_URL}`)
    if (connection) console.log("RabbitMQ connected.")

    /* Create channel */
    channel = await connection.createChannel()
}

start()

/* Publish message to queue */
export const publishToQueue = async (queueName: any, data: any) => {
    await channel.assertQueue(queueName)
    await channel.sendToQueue(queueName, Buffer.from(data), { persistent: true })
}