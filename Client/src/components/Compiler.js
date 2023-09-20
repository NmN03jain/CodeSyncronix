import React from 'react'
import { useEffect } from 'react'


const Compiler = () => {
  useEffect(()=>{
    async function init(){
        // Codemirror.textarea(document.getElementById("textA") ,{
        //   mode:{name:'javascript'},
        // })
    }
    init();
  },[]);

  return (
    <textarea className='textA'> </textarea>
  )
}

export default Compiler;
