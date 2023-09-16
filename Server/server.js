const express = require('express');
const socket = require('socket.io');
const http = require('http');


const app = express();
const server = http.createServer(app);
const io = socket(server);

app.get('/api', (req,res) => {
    res.json({"users":"Pradyum"});
});

io.on('connection',(socket)=> {
    console.log("user is connected");
})





app.listen(5000, ()=>{
    console.log("Server started on PORT: 5000");
});