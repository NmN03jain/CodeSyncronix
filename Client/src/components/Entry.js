// Entry.js

import React, { useState } from 'react';
import { v4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";

const Entry = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [userName, setUserNames] = useState([]);
  

 

  const CreateRoom = (e) => {
    e.preventDefault();
    const id = v4();
    setRoomId(id);
    toast.success("New Room Created ");
  };

  const JoinRoom = () => {
    if (!roomId || !userName) {
      toast.error("UserName and Room Id is required !");
    } else {
      const socket = io.connect("http://localhost:5000", {
        query: { roomId }, // Pass the roomId to the socket connection
      });

      socket.on("connect", () => {
        socket.emit("join-room", roomId);
      });

      navigate(`/Collaborate/${roomId}`, {
        state: {
          roomId,
          userName,
          socket, // Pass the socket instance to Collaborate
        },
      });

      
    }
  };

  const ForEnter = (e) => {
    if (e.code === "Enter") {
      JoinRoom();
    }
  };

  return (
    <>
      <div className="Home">
        <div className='Form'>
          <h1 className='heading'>CodeSyncronix</h1>
          <div className='inputs'>
            <input
              className='inputfield'
              type='text'
              placeholder='USER-NAME'
              value={userName}
              onChange={(e) => { setUserNames(e.target.value) }}
              onKeyUp={ForEnter}
            />
            <input
              className='inputfield'
              type='text'
              placeholder='ROOM-ID'
              onChange={(e) => { setRoomId(e.target.value) }}
              value={roomId}
              onKeyUp={ForEnter}
            />
            <button onClick={JoinRoom} className='but'> Join Room </button>
            <p className='hel'>IF You Want to create Room &nbsp; <a onClick={CreateRoom} href="_">Create Room ID</a> </p>
          </div>
        </div>
        <div className="rest-of-the-component">
          {/* Add your content for the rest of the component here */}
        </div>
      </div>
    </>
  );
};

export default Entry;
