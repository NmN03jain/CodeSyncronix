<<<<<<< Updated upstream
import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
=======
// import React from "react";
// import './Collaborate.css';
// import { useLocation } from "react-router-dom";
// import io from "socket.io-client";
// import { useEffect, useState } from "react";
// import Editor from '@monaco-editor/react';
>>>>>>> Stashed changes


// import React from "react";
// import './Collaborate.css';
// import { useLocation } from "react-router-dom";
// import io from "socket.io-client";
// import { useEffect, useState } from "react";
// import Editor from '@monaco-editor/react';      

// const Collaborate = () => {
//     const location = useLocation();
//     const user = location.state.userName;
//     const roomId = location.state.roomId;
//     const [socket, setSocket] = useState(null);
//     const [textAreaValue, setTextAreaValue] = useState(""); // State for the textarea value

//     useEffect(() => {
//         const newSocket = io.connect("http://localhost:5000", {
//             query: { roomId },
//         });

//         newSocket.on("connect", () => {
//             newSocket.emit("join-room", roomId);
//         });

//         setSocket(newSocket);

//         // Listen for changes in textarea content from other clients
//         newSocket.on("receive-text-area-update", (data) => {
//             setTextAreaValue(data.newText);
//         });

//         return () => {
//             if (socket) {
//                 socket.disconnect();
//             }
//         };
//     }, [roomId]);

//     // Handle changes in the textarea
//     const handleTextAreaChange = (event) => {
//         const newText = event.target.value;
//         setTextAreaValue(newText);

//         // Emit a socket event to update the textarea content for other clients
//         socket.emit("text-area-update", { newText, roomId });
//     };

//     return (
//         <>
//             <div className="main-container">
//                 <div className="side-panel">
//                     <div className="Code-Syncronix">
//                         <h2>Code-Syncronix</h2>
//                     </div>
//                     <ul>
//                         <li>{user}</li>
//                     </ul>
//                 </div>
//                 <div className="editor">
//                     {/* <textarea
//                         rows={20}
//                         cols={50}
//                         value={textAreaValue} // Bind the value to the state
//                         onChange={handleTextAreaChange} // Handle textarea changes
//                     ></textarea> */}
//                     <Editor height="90vh" defaultLanguage="cplusplus" defaultValue="// some comment" />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Collaborate;



import React from "react";
import './Collaborate.css';
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Editor from '@monaco-editor/react';
import { useRef } from "react";

const Collaborate = () => {
    const location = useLocation();
    const roomId = location.state.roomId;
    const [socket, setSocket] = useState(null);
    const [editorContent, setEditorContent] = useState("// some comment"); // State to store editor content

    // Create a ref to the Monaco Editor instance
    const editorRef = useRef(null);

    useEffect(() => {
        const newSocket = io.connect("http://localhost:5000", {
            query: { roomId },
        });

        newSocket.on("connect", () => {
            newSocket.emit("join-room", roomId);
        });

        setSocket(newSocket);

        // Function to handle incoming editor content updates
        const handleEditorContentUpdate = (data) => {
            // Update the editor content state
            setEditorContent(data.newText);
        };

        // Listen for changes in the editor content from other clients
        newSocket.on("receive-editor-content", handleEditorContentUpdate);

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [roomId]);

    // Function to handle changes in the Monaco Editor
    const handleEditorChange = (value, event) => {
        // Update the editor content state
        setEditorContent(value);

        // Emit a socket event to update the editor content for other clients
        socket.emit("editor-content-update", { newText: value, roomId });
    };

    return (
        <>
<<<<<<< Updated upstream
            <div>
                <textarea
                    rows={20}
                    cols={50}
                    value={textAreaValue} // Bind the value to the state
                    onChange={handleTextAreaChange} // Handle textarea changes
                ></textarea>
=======
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
                    <Editor
                        height="90vh"
                        defaultLanguage="javascript"
                        value={editorContent} // Set the editor content from state
                        onChange={handleEditorChange} // Handle editor changes
                        // Pass in the editor reference to get the editor instance
                        onMount={(editor, monaco) => {
                            // Save a reference to the editor instance
                            editorRef.current = editor;
                        }}
                    />
                </div>
>>>>>>> Stashed changes
            </div>
        </>
    );
};

export default Collaborate;
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
