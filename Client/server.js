const express = require('express');
const app = express();


const bodyP = require("body-parser")
app.use(bodyP.json())
const compiler = require("compilex")
const options = { stats: true }
compiler.init(options);


const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const io = new Server(server);
app.use(cors())

// app.use(express.static('../client/build'))
// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,'../client/build','index.html'))
// })

const listOfUser = {};


function allUsers(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: listOfUser[socketId]
        }
    });
}

// io.on listen for the event
io.on('connection', (socket) => {
    console.log("User is connected", socket.id);

    socket.on("join", ({ roomId, username }) => {
        listOfUser[socket.id] = username;
        socket.join(roomId)
        const users = allUsers(roomId);
        console.log(users);
        users.forEach(({ socketId }) => {
            io.to(socketId).emit("joined", {
                users,
                username,
                socketId: socket.id,
            })
        })
    })

    socket.on('code-change', ({ roomId, myCode }) => {
        socket.in(roomId).emit('code-change', {
            myCode
        })
    })

    socket.on('sync-code', ({ socketId, myCode }) => {
        io.to(socketId).emit('code-change', { myCode })
    })

    socket.on('disconnecting', () => {
        const room = [...socket.rooms]
        room.forEach((roomId) => {
            socket.in(roomId).emit('disconnected', {
                socketId: socket.id,
                username: listOfUser[socket.id]
            })
        })
        delete listOfUser[socket.id]
        socket.leave();

    })

})

app.get("/", () => {
    compiler.flush(() => {
        console.log("deleted");
    })
})

// compiler code 
app.post("/Collaborate", (req, res) => {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang


    try {
        // res.send("hello bhai")
        if (lang == "Cpp" || lang == "C") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "Syntax Error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "give input" })
                    }
                });
            }

        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows", options: { timeout: 10000 } };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "Syntax Error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows", options: { timeout: 10000 } };
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if(input){
                        if (data.output) {
                            res.send(data);
                        }
                        else {
                            res.send({ output: "give input" })
                        }
                    }
                    else{
                        res.send({output:"give input"})
                    }
                });
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "windows", options: { timeout: 10000 } };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "Indentation Error" })
                    }
                });
            } 
            else {
                var envData = { OS: "windows", options: { timeout: 10000 } };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "give input" })
                    }
                });
            }
        }

    } catch (error) {
        console.log("shiit happend")
    }

})


// tap.listen(8000) 

server.listen(5000, () => {
    console.log("Server Started on PORT: 5000");
})








