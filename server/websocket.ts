import WebSocket from 'ws';
import { processMmessage } from './utility'
export default function setupWebsocketServer() {
    //
    const wss = new WebSocket.Server({
        port: 1338,
    });
    wss.on('connection', function connection(ws) {
        // a single client has joined
        ws.on('message', function incoming(payload) {
            const message = processMmessage(payload.toString())
            if (!message) {
                // corrupted message from Client
                // ignore
                return
            }
            ws.send(JSON.stringify(message))
        });

        ws.send('something');
    });
}