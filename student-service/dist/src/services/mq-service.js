"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishToQueue = void 0;
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const CONN_URL = 'amqps://fsombrzk:S5Rf6HGEnybxiOCBqXgbmjIo1X1ME5Ys@cougar.rmq.cloudamqp.com/fsombrzk';
let ch = null;
/* AMQP connection */
callback_api_1.default.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
        console.log("RabbitMQ connected.");
    });
});
/* Publish message to queue */
const publishToQueue = (queueName, data) => __awaiter(void 0, void 0, void 0, function* () {
    ch.sendToQueue(queueName, Buffer.from(data), { persistent: true });
});
exports.publishToQueue = publishToQueue;
/* Disconnect AMQP */
process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});
