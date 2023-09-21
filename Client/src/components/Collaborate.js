import React from "react";
import './Collaborate.css';
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Editor from '@monaco-editor/react';
import { useRef } from "react";

const Collaborate = () => {
    const location = useLocation();
    const user = location.state.userName;
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
            </div>
        </>
    );
};

export default Collaborate;