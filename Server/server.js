// const express = require('express');
// const { Server } = require('socket.io');
// const http = require('http');
// const cors = require('cors');

// const app2 = express();
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//     },
// });

// app2.post("/compile", (req, res) => {
//     //getting the required data from the request
//     let code = req.body.code;
//     let language = req.body.language;
//     let input = req.body.input;

//     if (language === "python") {
//         language = "py"
//     }

//     let data = ({
//         "code": code,
//         "language": language,
//         "input": input
//     });
//     let config = {
//         method: 'post',
//         url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         data: data
//     };
//     //calling the code compilation API
//     Axios(config)
//         .then((response) => {
//             res.send(response.data)
//             console.log(response.data)
//         }).catch((error) => {
//             console.log(error);
//         });
// })

// io.on("connection", (socket) => {
//     console.log("A user connected", socket.id);

//     socket.on("join-room", (roomId) => {
//         socket.join(roomId);
//         console.log(`User joined room: ${roomId}`);
//     });

//     socket.on("editor-content-update", (data) => {
//         // Broadcast the updated text to all clients in the same room
//         io.to(data.roomId).emit("receive-editor-content", {
//             newText: data.newText,
//         });
//     });

//     socket.on("disconnect", () => {
//         console.log("A user disconnected");
//     });
// });

// app2.listen(6000,() =>{
//     console.log("App2 Server Started on PORT: 6000");
// })

// server.listen(5000, () => {
//     console.log("Server Started on PORT: 5000");
// });







const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const app = express();
const PORT = 8000;
 
app.use(cors());
app.use(express.json());
 
app.post("/compile", (req, res) => {
    //getting the required data from the request
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;
 
    if (language === "python") {
        language = "py"
    }
 
    let data = ({
        "code": code,
        "language": language,
        "input": input
    });
    let config = {
        method: 'post',
        url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    //calling the code compilation API
    Axios(config)
        .then((response) => {
            console.log(response.data);
            res.send(response.data)
            console.log(response.data)
        }).catch((error) => {
            // console.log(error);
            console.log("error");
        });
})
 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
