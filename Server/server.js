const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const {Server} = require('socket.io');
const cors = require('cors');

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
});

const listOfUser = {};

function allUsers(roomId){
   return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            username:listOfUser[socketId]
        }
   });
}

// io.on listen for the event
io.on('connection',(socket) => {
    console.log("User is connected",socket.id);
     
    socket.on("join", ({roomId,username}) => {
        listOfUser[socket.id] = username;
        socket.join(roomId)
        const users = allUsers(roomId);
        console.log(users);
        users.forEach(({socketId})=>{
            io.to(socketId).emit("joined",{
                users,
                username,
                socketId : socket.id,
            })
        })
    })

    socket.on('code-change',({roomId,myCode})=>{
        socket.in(roomId).emit('code-change',{
            myCode
        })
    })

    socket.on('sync-code',({socketId,myCode})=>{
        io.to(socketId).emit('code-change',{myCode})
    })

    socket.on('disconnecting',()=>{
        const room = [...socket.rooms]
        room.forEach((roomId)=>{
            socket.in(roomId).emit('disconnected',{
                socketId:socket.id,
                username:listOfUser[socket.id]
            })
        })
        delete listOfUser[socket.id]
        socket.leave();

    })

})


server.listen(5000, ()=>{
    console.log("Server Started on PORT: 5000");
})








