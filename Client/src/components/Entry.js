import React, { useState } from 'react';
import { v4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const Entry = () => {

  const navigate = useNavigate();
  const [roomId , setRoomId] = useState('');
  const [userName , setUserName] = useState('');
  const CreateRoom = (e)=>{
    e.preventDefault();
    const id = v4();
    setRoomId(id);
    toast.success("New Room Created");
  };

  const JoinRoom = () => {

    if (!roomId || !userName) {
      toast.error("UserName and Room Id is required !");
    }
    else{
    navigate(`/Collaborate/${roomId}`,{
      state:{
        userName, 
      },
    })
  }
  }

  const ForEnter = (event) => {
    if (event.code === "Enter") {
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
              onChange={(event) => { setUserName(event.target.value) }}
              onKeyUp={ForEnter}
            />
            <input
              className='inputfield'
              type='text'
              placeholder='ROOM-ID'
              onChange={(event) => { setRoomId(event.target.value) }}
              value={roomId}
              onKeyUp={ForEnter}
            />
            <button onClick={JoinRoom} className='but'> Join Room </button>
            <p className='hel'>Want to create new Room-ID ? &nbsp; <a onClick={CreateRoom} href="_">Create ID</a> </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Entry;