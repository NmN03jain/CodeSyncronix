const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
});

// io.on listen for the event
io.on('connection',(socket) => {
    console.log("User is connected");

    //listining for the send-message event
    socket.on("send-message", (data) => {
        // console.log(data);
        socket.broadcast.emit("receive-message", data);
    })
})


server.listen(5000, ()=>{
    console.log("Server Started on PORT: 5000");
})








