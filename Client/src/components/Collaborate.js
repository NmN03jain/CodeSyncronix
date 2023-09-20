import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';


const Collaborate = () => {
    const location = useLocation();
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
            <div>
                <textarea
                    rows={20}
                    cols={50}
                    value={textAreaValue} // Bind the value to the state
                    onChange={handleTextAreaChange} // Handle textarea changes
                ></textarea>
            </div>
        </>
    );
};

export default Collaborate;
