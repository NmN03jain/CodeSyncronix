import React from 'react'
import { useEffect, useRef } from 'react'
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/midnight.css';

const Editor = ({socketref,roomId,onCode}) => {

    const editorRef = useRef(null);
    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'midnight',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance, changes) => {
                console.log(changes)
                const {origin} = changes;
                const myCode = instance.getValue();
                onCode(myCode);
                if(origin!=='setValue'){
                    socketref.current.emit('code-change',{
                        roomId,
                        myCode
                    })
                }
            })
        }
        init();
    }, []);

    useEffect(()=>{
        if(socketref.current){

            socketref.current.on('code-change',({myCode})=>{
                if(myCode !== null){
                    editorRef.current.setValue(myCode)
                }
            })

        }
        return()=>{
            socketref.current.off('code-change')
        }
        
    },[socketref.current])

    return  <textarea id="realtimeEditor"> </textarea>;
       

    

}
export default Editor;
