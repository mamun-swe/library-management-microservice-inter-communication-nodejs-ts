var amqp = require('amqplib/callback_api');
const CONN_URL = 'amqps://fsombrzk:S5Rf6HGEnybxiOCBqXgbmjIo1X1ME5Ys@cougar.rmq.cloudamqp.com/fsombrzk';
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.consume('user-messages', function (msg) {
            console.log('.....');
            setTimeout(function () {
                console.log("Message:", msg.content.toString());
            }, 4000);
        }, { noAck: true }
        );
    });
});