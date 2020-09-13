"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const utility_1 = require("./utility");
function setupWebsocketServer() {
    //
    const wss = new ws_1.default.Server({
        port: 1338,
    });
    wss.on('connection', function connection(ws) {
        // a single client has joined
        ws.on('message', function incoming(payload) {
            const message = utility_1.processMmessage(payload.toString());
            if (!message) {
                // corrupted message from Client
                // ignore
                return;
            }
            ws.send(JSON.stringify(message));
        });
        ws.send('something');
    });
}
exports.default = setupWebsocketServer;
