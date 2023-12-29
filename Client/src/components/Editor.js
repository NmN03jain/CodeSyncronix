import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python'
import 'codemirror/mode/clike/clike'
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/theme/ayu-dark.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/shadowfox.css';


import { FaPlay } from "react-icons/fa";
import axios from "axios";


const Editor = ({ socketref, roomId, onCode }) => {
    const [outputData, setOutputData] = useState("")
    const editorRef = useRef(null);
    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'python', json: true },
                    theme: 'ambiance',
                    autoCloseTags: true,
                    autoCloseBrackets: true,    
                    lineNumbers: true,
                }
            );
            
            editorRef.current.on('change', (instance, changes) => {
                console.log(changes)
                const { origin } = changes;
                const myCode = instance.getValue();
                onCode(myCode);
                if (origin !== 'setValue') {
                    socketref.current.emit('code-change', {
                        roomId,
                        myCode
                    })
                }
            })
        }
        init();
    }, []);

    useEffect(() => {
        if (socketref.current) {

            socketref.current.on('code-change', ({ myCode }) => {
                if (myCode !== null) {
                    editorRef.current.setValue(myCode)
                }
            })

        }
        return () => {
            socketref.current.off('code-change')
        }

    }, [socketref.current])


    const options = () => {
        var option = document.getElementById("option")
        if (option.value === "Java") {
            editorRef.current.setOption("mode", "text/x-java")
        }
        else if (option.value === "Python") {
            editorRef.current.setOption("mode", "python")
        }
        else if (option.value === "Cpp" || option.value === "C") {
            editorRef.current.setOption("mode", "ext/x-c++src")
        }

    }



    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer yourAuthToken',
            'Content-Type': 'application/json',
        },
    };
 


    const getData = async () => {
        var option = document.getElementById("option")
        var code = {
            code: editorRef.current.getValue(),
            input: document.getElementById('inpu').value,
            lang: option.value 
        }
        const resp = await axios.post("http://localhost:5001/Collaborate", code, axiosConfig)
        setOutputData(resp.data.output)
        console.log("wh", resp.data.output) 
    }

    // useEffect(()=>{
    //      axios.get("http://localhost:5000")
    // },[])  

    return (
        <>
            <div className='Edit'>
                <div className='editor'>
                    <textarea id="realtimeEditor"></textarea>
                </div>

                <div className='feilds'>


                    <div className='run'>
                        <div >
                            <select onClick={options} id='option' className='choose' > languauge
                            <option className='op' value="Python">Python</option>
                                <option className='op' value="Java">Java</option>
                                <option className='op' value="Cpp">Cpp</option>
                                <option className='op' value="C">C</option>
                            </select>
                        </div>
                    </div>

                    <div className='input'>
                        <label>Input</label>
                        <textarea id='inpu' className='same' cols="30" rows="10"></textarea>
                    </div>
                    <div onClick={getData} className='runbut' > <FaPlay /></div>
                    <div className='output'>
                        <label>Output </label>
                        {/* <input className='out' value={outputData} /> */}
                        {/* <input type="text" id="codeInput" value={outputData} className="code-input out" placeholder="Enter code..."></input> */}
                        <textarea value={outputData} className="code-input out" > </textarea>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Editor;