"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const utility_1 = require("./utility");
const http_1 = __importDefault(require("http"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messagesFunction_1 = require("./messagesFunction");
const server = http_1.default.createServer();
const wss = new ws_1.default.Server({ noServer: true });
wss.on('connection', function connection(ws) {
    // a single client has joined
    // ws.connectionID = uuid()
    messagesFunction_1.clients.push(ws);
    ws.on('close', () => {
        messagesFunction_1.setClients(messagesFunction_1.clients.filter((generalSocket) => generalSocket.connectionID !== ws.connectionID));
    });
    ws.on('message', function incoming(payload) {
        const message = utility_1.processMessage(payload.toString());
        if (!message) {
            // corrupted message from Client
            // ignore
            return;
        }
        if (message.intent === 'chat') {
            messagesFunction_1.broadCastMessage(message, ws);
        }
        else if (message.intent === 'old-messages') {
            const count = message.count;
            if (!count)
                return;
            messagesFunction_1.retrieveAndSentMessage(ws, count);
        }
    });
});
server.on('upgrade', function upgrade(request, socket, head) {
    // This function is not defined on purpose. Implement it with your own logic.
    //token
    const token = request.url.slice(1);
    let email = '';
    try {
        const payload = jsonwebtoken_1.default.verify(token, utility_1.JWT_SECRET_TOKEN);
        email = payload.email;
    }
    catch (error) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }
    wss.handleUpgrade(request, socket, head, function done(ws) {
        const _ws = ws;
        _ws.connectionID = email;
        wss.emit('connection', _ws, request);
    });
});
server.listen(1338);
