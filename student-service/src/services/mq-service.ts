
import amqp from "amqplib/callback_api"

const CONN_URL = 'amqps://fsombrzk:S5Rf6HGEnybxiOCBqXgbmjIo1X1ME5Ys@cougar.rmq.cloudamqp.com/fsombrzk'

let ch: any = null

/* AMQP connection */
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel
        console.log("RabbitMQ connected.")
    })
})

/* Publish message to queue */
export const publishToQueue = async (queueName: any, data: any) => {
    ch.sendToQueue(queueName, Buffer.from(data), { persistent: true })
}

/* Disconnect AMQP */
process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});