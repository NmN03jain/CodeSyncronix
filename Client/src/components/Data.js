// AnotherComponent.js
import React from "react";
import Collaborate from "./Collaborate";

const Data = ({ username }) => {
  return (
    <div>
      
    <Collaborate data={username}/>
    </div>
  );
}

export default Data;