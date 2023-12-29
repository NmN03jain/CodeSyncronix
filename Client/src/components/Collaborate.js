import React from "react";
import Member from "./Member"
import Editor from "./Editor";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { socketIo } from "./socket";
import toast from 'react-hot-toast'
import { GrCopy } from "react-icons/gr";
import './Collaborate.css';





const Collaborate = (props) => {

    const [members, setMembers] = useState([])
    const location = useLocation();
    const navigate = useNavigate();
    const socketreff = useRef(null);
    const codeRef = useRef(null)



    useEffect(() => {
        const doit = async () => {

            socketreff.current = await socketIo();
            socketreff.current.on('connect_error', (err) => handleErrors(err));
            socketreff.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                navigate('/');
            }
            socketreff.current.emit('join', {
                username: location.state?.userName,
                roomId: location.state?.roomId
            })

            socketreff.current.on('joined', ({ users, username, socketId }) => {
                if (username !== location.state?.userName) {
                    toast.success(`${username} has joined `)
                }
                setMembers(users)
                console.log(codeRef.current)
                socketreff.current.emit('sync-code', {
                    myCode: codeRef.current,
                    socketId,
                })

            })

            socketreff.current.on('disconnected', ({ socketId, username }) => {
                toast.success(`${username} has left the room`)
                setMembers((prev) => {
                    return prev.filter((member) => member.socketId !== socketId)
                })
            })

        }
        doit();

        return () => {
            socketreff.current.disconnect();
            socketreff.current.off('joined');
            socketreff.current.off('disconnected')
        }

    }, [])
    if (!location.state) {
        return <Navigate to="/" />
    }

    const copyId = () => {
        navigator.clipboard.writeText(location.state.roomId)
        toast.success("Room ID copied ")
    }   
    const LeaveRoom = () => {
        const result = window.confirm("Do you want to proceed?");

        if (result) {
          navigate('/');
        } 
    }


    return (
        <>
            <div className="Main">
                <div className="LeftSide">

                    <div className="LeftSideInner">
                        <div className="Logo">
                            
                            {/* <h2 className='heading'>Code-Syncronix</h2> */}
                            <h2 className='heading'>Collaboration</h2>
                        </div>

                        <h4 > Connected Users </h4>

                        {/* <select> */}
                            <div className="Members">
                                {
                                    members.map((member) => (
                                        <Member key={member.socketId} username={member.username} />
                                        // <option>{member.username}</option>
                                    ))

                                }
                            </div>

                        {/* </select> */}

                    </div>
                    <div className='copy-leave'>
                  <button className='glow-on-hover bt leave 'onClick={copyId}  >Copy Room Id</button>
                  <button className='glow-on-hover bt leave ' onClick={LeaveRoom} >Leave Room</button>
                </div>



                </div>

                <div className="rightSide">

                    <Editor
                        socketref={socketreff}
                        roomId={location.state?.roomId}
                        onCode={(myCode) => {
                            codeRef.current = myCode
                        }}
                    />
                </div>
            </div>


        </>
    )
}
export default Collaborate;