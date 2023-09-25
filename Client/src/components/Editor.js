import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python'
import 'codemirror/mode/clike/clike'


import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/panda-syntax.css';
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
                    theme: 'panda-syntax',
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


    const options = ()=>{
        var option = document.getElementById("option")
        if(option.value=="Java"){ 
            editorRef.current.setOption("mode","text/x-java")
        }
        else if(option.value=="Python"){
            editorRef.current.setOption("mode","python")
        }
        else if (option.value = "Cpp"){
            editorRef.current.setOption("mode","ext/x-c++src")

        }
    }



    const axiosConfig = {
        headers: {
            'Authorization': 'Bearer yourAuthToken',
            'Content-Type': 'application/json',
        },
    };
    // var input = document.getElementById("inpu")
    // var edito = document.getElementById("realtimeEditor")
    var code;


    const getData = async () => {
        var option = document.getElementById("option") 
        var code = {
            code: editorRef.current.getValue(),
            input: document.getElementById('inpu').value,
            lang: option.value
        }
        const resp = await axios.post("http://localhost:5000/Collaborate", code, axiosConfig)
        setOutputData(resp.data)
        console.log(resp.data.output)  
    }



    return (
        <>
            <div className='Edit'>
                <div className='editor'>
                    <textarea id="realtimeEditor"> </textarea>
                </div>

                <div className='feilds'>

                    <div  className='run'>
                        <div onClick={getData} className='runbut' > <FaPlay /></div>
                         
                        <div>
                            <select onClick={options} id='option'> 
                                <option selected>Choose...</option>
                                <option value="Python">Python</option>
                                <option value="Java">Java</option>
                                <option value="Cpp">Cpp</option>
                            </select>
                        </div>
                    </div>

                    <div className='input'>
                        <label>Input</label>
                        <textarea id='inpu' className='same' cols="30" rows="10"></textarea>
                    </div>
                    <div className='output'>
                        <label>Output </label>
                        {/* <textarea id='outp' className='same' cols="30" rows="10">{outputData}</textarea> */}
                        <input className='out' value={outputData.output} />
                    </div>
                </div>
            </div>

        </>
    )




}
export default Editor;
