import React from "react";
import Member from "./Member"
import Compiler from "./Compiler";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:5000");

const Collaborate = () => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const sendMessage = () => {
        socket.emit("send-message", { message });
    }
    
    useEffect(() => {
        socket.on("receive-message", (data) => {
            setMessageReceived(data.message);
        });
    }, []);


    const [members ,setMembers] = useState([
        {id:1,username:"Pradyumn"},
        {id:2,username:"Naman "},
    ])

    return (
        <>
            <div className="Main">
                <div className="LeftSide">

                    <div className="LeftSideInner">
                        <div className="Logo">
                        <h2 className='heading'>Code-Syncronix</h2>
                        </div>

                        <h4 >CONNECTED MEMBERS</h4>
                        <div className="Members">
                            {
                                members.map((member)=>(  
                                    <Member  key={member.id} username ={member.username}/>
                                ))
                            }
                        </div>

                    </div>
                        <button className="bt copy">Copy Room Id</button>
                        <button className="bt leave">Leave Room</button>
                     </div>

                <div className="rightSide"> 

                <Compiler/>
                
                </div>

            </div>

            {/* <div className="code-editor">
                <input placeholder="Message..." onChange={(event) => {
                    setMessage(event.target.value);
                }}/>
                <button onClick={sendMessage}>Send</button>
                <pre contenteditable="true" class="code-box" >
                    {messageReceived}
                </pre>

            </div> */}
        </>
    )
}
export default Collaborate;