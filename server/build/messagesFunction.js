"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveAndSentMessage = exports.broadCastMessage = exports.setClients = exports.clients = void 0;
const messages_1 = __importDefault(require("./models/messages"));
exports.clients = [];
function setClients(Newclients) {
    exports.clients = Newclients;
}
exports.setClients = setClients;
function broadCastMessage(message, ws) {
    const NewMessage = new messages_1.default({
        email: ws.connectionID,
        subject: message.subject,
        message: message.message,
        date: Date.now()
    });
    NewMessage.save(); // will queue task in background
    // Broadcast the message to all clients.
    for (let i = 0; i < exports.clients.length; i++) {
        const client = exports.clients[i];
        client.send(JSON.stringify({
            subject: message.subject,
            message: message.message,
            user: ws.connectionID,
            intent: 'chat'
        }));
    }
}
exports.broadCastMessage = broadCastMessage;
async function retrieveAndSentMessage(ws, count) {
    const messages = await messages_1.default.find({}, { email: 1, message: 1, subject: 1 }).sort({ date: -1 }).limit(count).lean();
    ws.send(JSON.stringify({
        intent: 'old-messages',
        data: messages,
    }));
}
exports.retrieveAndSentMessage = retrieveAndSentMessage;
