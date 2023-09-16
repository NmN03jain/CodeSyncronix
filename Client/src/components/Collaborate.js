import React from "react";
import { useState, useEffect } from 'react';

const Collaborate = () => {

    // Fetching the Data from backend and storing it on the backendData Variable
    const [backendData, setBackendData] = useState([{}]);
    useEffect(() => {
        fetch("/api").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data);
            }
        )
    }, []);


    return (
        <>
            <div className="code-editor">
                <pre contenteditable="true" class="code-box">
                    {backendData.users}
                </pre>
            </div>
        </>
    )
}
export default Collaborate;