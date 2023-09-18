import React from 'react'
import {v4} from "uuid";
import { useState } from 'react';
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
    toast.success("New Room Created ")
  }
  const JoinRoom = ()=>{

    if(!roomId || !userName){
      toast.error("UserName and Room Id is required !")
    }
    else{
    navigate(`/Collaborate/${roomId}`,{
      state:{
        userName, 
      },
    })
  }
  }

  const ForEnter = (e)=>{
    if(e.code==="Enter"){
      JoinRoom();
    }
  }  

  return (
    <>
      <div className="Home">
        <div className='Form'>
            <h1 className='heading'>CodeSyncronix</h1>
          <div className='inputs'>

            <input className='inputfield' type='text' placeholder='USER-NAME' value={userName} onChange={(e)=>{setUserName(e.target.value)}} onKeyUp={ForEnter} />

            <input className='inputfield' type='text' placeholder='ROOM-ID' onChange={(e)=>{setRoomId(e.target.value)}} value={roomId} onKeyUp={ForEnter} />

            <button onClick={JoinRoom} className='but'> Join RooM </button>

            <p className='hel'>IF You Want to create Room &nbsp; <a onClick={CreateRoom} href="_">Create Room ID</a> </p>
          </div>
        </div>
      </div>

    </>
  )
}

export default Entry