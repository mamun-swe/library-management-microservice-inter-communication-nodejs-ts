
import { Request, Response, NextFunction } from "express"
import client, { Channel, Connection, ConsumeMessage } from "amqplib"
const CONN_URL = process.env.AMQP_URL

let channel: Channel

export const rabbitMQService = async (req: Request, res: Response, next: NextFunction) => {

    /* Create connection */
    const connection: Connection = await client.connect(`${CONN_URL}`)
    if (connection) console.log("RabbitMQ connected.")

    /* Create channel */
    channel = await connection.createChannel()

    await channel.consume("user-messages", userMessageConsumer(channel))
    next()
}

export const userMessageConsumer = (channel: Channel) => (msg: ConsumeMessage | null) => {
    if (msg) {
        // Display the received message
        console.log(msg.content.toString())
        console.log(msg)

        // Acknowledge the message
        channel.ack(msg)
    }
}
