const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on("send-message", (data) => {
        io.to(data.roomId).emit("receive-message", {
            message: data.message,
            username: data.username,
        });
    });

    socket.on("text-area-update", (data) => {
        // Broadcast the updated text to all clients in the same room
        io.to(data.roomId).emit("receive-text-area-update", {
            newText: data.newText,
        });
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});


server.listen(5000, () => {
    console.log("Server Started on PORT: 5000");
});








