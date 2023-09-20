import React from "react";
import './Collaborate.css';
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Editor from '@monaco-editor/react';

// const Collaborate = () => {
//     const location = useLocation();
//     const roomId = location.state.roomId;
//     const [socket, setSocket] = useState(null);

//     const [message, setMessage] = useState("");
//     const [messageReceived, setMessageReceived] = useState("");

//     const sendMessage = () => {
//         socket.emit("send-message", { message, roomId });
//     };

//     useEffect(() => {
//         const newSocket = io.connect("http://localhost:5000", {
//             query: { roomId },
//         });

//         newSocket.on("connect", () => {
//             newSocket.emit("join-room", roomId);
//         });

//         setSocket(newSocket);

//         newSocket.on("receive-message", (data) => {
//             setMessageReceived(data.message);
//         });

//         return () => {
//             if (socket) {
//                 socket.disconnect();
//             }
//         };
//     }, [roomId]);

//     return (
//         <>

//             <div className="code-editor">
//                 <input placeholder="Message..." onChange={(event) => {
//                     setMessage(event.target.value);
//                 }} />
//                 <button onClick={sendMessage}>Send</button>
//                 <h1>{messageReceived}</h1>
//             </div>


//             <div>
//                 <textarea rows={20} cols={50}></textarea>
//             </div>
//         </>
//     );
// };

// export default Collaborate;

const Collaborate = () => {
    const location = useLocation();
    const user = location.state.userName;
    const roomId = location.state.roomId;
    const [socket, setSocket] = useState(null);
    const [textAreaValue, setTextAreaValue] = useState(""); // State for the textarea value

    useEffect(() => {
        const newSocket = io.connect("http://localhost:5000", {
            query: { roomId },
        });

        newSocket.on("connect", () => {
            newSocket.emit("join-room", roomId);
        });

        setSocket(newSocket);

        // Listen for changes in textarea content from other clients
        newSocket.on("receive-text-area-update", (data) => {
            setTextAreaValue(data.newText);
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [roomId]);

    // Handle changes in the textarea
    const handleTextAreaChange = (event) => {
        const newText = event.target.value;
        setTextAreaValue(newText);

        // Emit a socket event to update the textarea content for other clients
        socket.emit("text-area-update", { newText, roomId });
    };

    return (
        <>
            <div className="main-container">
                <div className="side-panel">
                    <div className="Code-Syncronix">
                        <h2>Code-Syncronix</h2>
                    </div>
                    <ul>
                        <li>{user}</li>
                    </ul>
                </div>
                <div className="editor">
                    {/* <textarea
                        rows={20}
                        cols={50}
                        value={textAreaValue} // Bind the value to the state
                        onChange={handleTextAreaChange} // Handle textarea changes
                    ></textarea> */}
                    <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />
                </div>
            </div>
        </>
    );
};

export default Collaborate;