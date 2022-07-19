import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 4000});

wss.on('connection', (ws) => {
    // Show when connected
    ws.send('Connected');
    // Receive message
    ws.on('message', (msg) => {
      let realMsg = Buffer.from(msg).toString('utf-8');
      console.log(realMsg);
      wss.clients.forEach(function(client) {
        client.send(realMsg);
      });
    });
    ws.on('close', function close() {
        console.log('Disconnected');
    });
});

