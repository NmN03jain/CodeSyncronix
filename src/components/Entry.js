import React from 'react'


const Entry = () => {
  return (
    <>
      <div className="Home">
        <div className='Form'>
            <h1 className='heading'>CodeSyncronix</h1>
          <div className='inputs'>
            <input className='inputfield' type='text' placeholder='USER-NAME' />
            <input className='inputfield' type='text' placeholder='ROOM-ID' />
            <button className='but'> Join RooM </button>
            <p className='hel'>IF You Want to create Room &nbsp; <a href="blank">Create Room ID</a> </p>
          </div>
        </div>
      </div>

    </>
  )
}

export default Entry