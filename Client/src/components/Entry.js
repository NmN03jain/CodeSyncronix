import React from 'react'
import { v4 } from "uuid";
import { useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';



const Entry = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [copied, setCopied] = useState(false);

  const CreateRoom = (e) => {
    e.preventDefault();
    const id = v4();
    setRoomId(id);
    toast.success("New Room Created ")
  }

  const JoinRoom = (e) => {

    if (!roomId || !userName) {
      e.preventDefault() 
      toast.error("UserName and Room Id is required !")
    }
    else {
      navigate(`/Collaborate/${roomId}`, {
        state: {
          userName, roomId, 
        },
      })
    }
  }

  const ForEnter = (e) => {
    if (e.code === "Enter") {
      JoinRoom();
    }
  }

  const handleDoubleClick = (e) => {
    if (roomId) {
      e.preventDefault();
      navigator.clipboard.writeText(roomId)
        .then(() => {
          toast.success("Room ID Copied!");
          setCopied(true);
        })
        .catch((error) => {

          console.error('Copy failed:', error);
        });
    }
  };

  return (
    <>

      <div class="wrapper">
        <div id="stars"></div>
        <div className="Home">

          <form class="Form">
            <div className='inside-form'>
              <h1 className='heading'>CodeSyncronix</h1>
              <div className='inputs'>
                <input className='inputfield' type='text' placeholder='USER-NAME' value={userName} onChange={(e) => { setUserName(e.target.value) }} onKeyUp={ForEnter} /> 

                <input className='inputfield' type='text' placeholder='ROOM-ID' onChange={(e) => { setRoomId(e.target.value) }} value={roomId} onKeyUp={ForEnter} onDoubleClick={handleDoubleClick} />

                <div className='button-container'>
                  <button className='glow-on-hover' onClick={JoinRoom}>JOIN ROOM</button>
                  <button className='glow-on-hover' onClick={CreateRoom}>CREATE ID</button>
                </div>
              </div>
            </div>
          </form>

          <div id="footer">
            <br />
            <span>NAMAN AND PRADYUM CODESYNCRONIX @2023</span>
          </div>

        </div>
      </div>

    </>
  )
}

export default Entry;