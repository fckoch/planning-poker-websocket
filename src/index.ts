import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const PORT = process.env.PORT || 8899;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
});