const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Отдаём файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Когда заходят на сайт - показываем index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// WebSocket для чата
io.on('connection', (socket) => {
    console.log('Кто-то подключился!');
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

// Запускаем сервер на порту 3000
server.listen(3000, () => {
    console.log('Сервер запущен! Открой http://localhost:3000');
});