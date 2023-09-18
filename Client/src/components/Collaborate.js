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