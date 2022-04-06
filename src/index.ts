import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { Player } from './player';

const PORT = process.env.PORT || 8899;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {

    console.log('user connected');
    let players: Player[] = [];

    socket.on('select place', (player: Player) => {
        console.log(players);
        players = [
            ...players,
            player
        ]
        console.log(players);

        socket.emit('select place', players);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
});