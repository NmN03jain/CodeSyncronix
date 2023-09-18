import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:5000");


const Collaborate = () => {

    //Using useState for getting what the user is typing on the code-editor
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const sendMessage = () => {
        socket.emit("send-message", { message });
    }
    // we are using this useEffect to listen from the data 
    //which is emitted by the server by "socket.emit("receive-message", data)";
    useEffect(() => {
        socket.on("receive-message", (data) => {
            setMessageReceived(data.message);
        });
    }, [socket]);

    return (
        <>
            <div className="code-editor">
                <input placeholder="Message..." onChange={(event) => {
                    setMessage(event.target.value);
                }}/>
                <button onClick={sendMessage}>Send</button>

                <pre contenteditable="true" class="code-box" >
                    {messageReceived}
                </pre>
                </div> 

                


        </>
    )
}
export default Collaborate;

// import React from "react";
// import io from "socket.io-client";
// // import { useEffect, useState } from "react";

// const socket = io.connect("http://localhost:5000");

// const Collaborate = () => {

//     const textArea = document.getElementById('text-area');

//     socket.on('text-updated', (data) => {
//         textArea.value = data;
//     });

//     textArea.addEventListener('input', function () {
//         const newText = this.value;
//         socket.emit('text-change', newText);
//     });

//     return (
//         <>
//             <h1>Hello</h1>
//             <textarea id="text-area" rows="10" cols="50"></textarea>
//         </>
//     )
// }




// export default Collaborate;