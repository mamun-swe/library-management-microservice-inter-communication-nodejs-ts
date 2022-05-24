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
exports.publishToQueue = exports.rabbitMQService = void 0;
const uuid_1 = require("uuid");
const amqplib_1 = __importDefault(require("amqplib"));
const CONN_URL = process.env.AMQP_URL;
let channel;
const rabbitMQService = () => __awaiter(void 0, void 0, void 0, function* () {
    /* Create connection */
    const connection = yield amqplib_1.default.connect(`${CONN_URL}`);
    if (connection)
        console.log("RabbitMQ connected.");
    /* Create channel */
    channel = yield connection.createChannel();
});
exports.rabbitMQService = rabbitMQService;
/* Publish message to queue */
const publishToQueue = (queueName, data) => __awaiter(void 0, void 0, void 0, function* () {
    const q = yield channel.assertQueue(queueName);
    yield channel.sendToQueue(queueName, Buffer.from(data), {
        replyTo: q.queue,
        correlationId: (0, uuid_1.v4)()
    });
});
exports.publishToQueue = publishToQueue;
