import WebSocket from 'ws';
import { processMessage, CustomWebsocket, JWT_SECRET_TOKEN } from './utility'
import http from 'http'
import jwt from 'jsonwebtoken'
import { broadCastMessage, clients, retrieveAndSentMessage, setClients } from './messagesFunction';
import { set } from 'mongoose';

const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });



wss.on('connection', function connection(ws: CustomWebsocket) {
    // a single client has joined

    // ws.connectionID = uuid()
    clients.push(ws)
    ws.on('close', () => {
        setClients(
            clients.filter((generalSocket) => generalSocket.connectionID !== ws.connectionID)
        )
    })
    ws.on('message', function incoming(payload) {
        const message = processMessage(payload.toString())
        if (!message) {
            // corrupted message from Client
            // ignore
            return
        }

        if (message.intent === 'chat') {
            broadCastMessage(message, ws)
        } else if (message.intent === 'old-messages') {
            const count = message.count
            if (!count) return
            retrieveAndSentMessage(ws, count)
        }

    });
});

server.on('upgrade', function upgrade(request, socket, head) {
    // This function is not defined on purpose. Implement it with your own logic.
    //token
    const token = request.url.slice(1)
    let email: string = ''
    try {
        const payload: any = jwt.verify(token, JWT_SECRET_TOKEN)
        email = payload.email
    }
    catch (error) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }

    wss.handleUpgrade(request, socket, head, function done(ws) {
        const _ws = ws as CustomWebsocket
        _ws.connectionID = email
        wss.emit('connection', _ws, request);
    });
});


server.listen(1338);