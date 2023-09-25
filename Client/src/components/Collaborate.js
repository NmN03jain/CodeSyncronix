// import React from "react";
// import './Collaborate.css';
// import { useLocation } from "react-router-dom";
// import io from "socket.io-client";
// import { useEffect, useState } from "react";
// import Editor from '@monaco-editor/react';
// import { useRef } from "react";
// import Axios from 'axios';
// // import spinner from './spinner.svg';

// const Collaborate = () => {
//     const location = useLocation();
//     const user = location.state.userName;
//     const roomId = location.state.roomId;
//     const [socket, setSocket] = useState(null);
//     const [editorContent, setEditorContent] = useState("// some comment"); // State to store editor content
    
//     const [userInput, setUserInput] = useState("");
//     const [userOutput, setUserOutput] = useState("");
//     const [loading, setLoading] = useState(false);
//     // Create a ref to the Monaco Editor instance
//     const editorRef = useRef(null);

//     useEffect(() => {
//         const newSocket = io.connect("http://localhost:5000", {
//             query: { roomId },
//         });

//         newSocket.on("connect", () => {
//             newSocket.emit("join-room", roomId);
//         });

//         setSocket(newSocket);

//         // Function to handle incoming editor content updates
//         const handleEditorContentUpdate = (data) => {
//             // Update the editor content state
//             setEditorContent(data.newText);
//         };

//         // Listen for changes in the editor content from other clients
//         newSocket.on("receive-editor-content", handleEditorContentUpdate);

//         return () => {
//             if (socket) {
//                 socket.disconnect();
//             }
//         };
//     }, [roomId, socket]);

//     // Function to handle changes in the Monaco Editor
//     const handleEditorChange = (value, event) => {
//         // Update the editor content state
//         setEditorContent(value);

//         // Emit a socket event to update the editor content for other clients
//         socket.emit("editor-content-update", { newText: value, roomId });
//     };

//     function compile() {
//         setLoading(true);
//         if (editorContent === ``) {
//             return
//         }

//         // Post request to compile endpoint
//         Axios.post(`http://localhost:6000/compile`, {
//             code: editorContent,
//             language: "javascript",
//             input: userInput
//         }).then((res) => {
//             setUserOutput(res.data.output);
//         }).then(() => {
//             setLoading(false);
//         })
//     }

//     function clearOutput() {
//         setUserOutput("");
//     }

//     return (
//         <>
//             <div className="main-container">
//                 <div className="side-panel">
//                     <div className="Code-Syncronix">
//                         <h2>Code-Syncronix</h2>
//                     </div>
//                     <ul>
//                         <li>{user}</li>
//                     </ul>
//                 </div>
//                 <div className="editor">
//                     <Editor 
//                         width="700px"
//                         height="90vh"
//                         defaultLanguage="javascript"
//                         value={editorContent} // Set the editor content from state
//                         onChange={handleEditorChange} // Handle editor changes
//                         // Pass in the editor reference to get the editor instance
//                         onMount={(editor, monaco) => {
//                             // Save a reference to the editor instance
//                             editorRef.current = editor;
//                         }}
//                     />
//                     <button className="run-btn" onClick={() => compile()}>
//                         Run
//                     </button>
//                 </div>
//                 <div className="right-container">
//                     <h4>Input:</h4>
//                     <div className="input-box">
//                         <textarea id="code-inp" onChange=
//                             {(e) => setUserInput(e.target.value)}>
//                         </textarea>
//                     </div>
//                     <h4>Output:</h4>
//                     {loading ? (
//                         <div className="spinner-box">
//                             <h1>Loading</h1>
//                         </div>
                        
//                     ) : (
//                         <div className="output-box">
//                             <pre>{userOutput}</pre>
//                             <button onClick={() => { clearOutput() }}
//                                 className="clear-btn">
//                                 Clear
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
        
//         </>
//     );
// };

// export default Collaborate;


import { useState } from 'react';
import './app.css';
import Editor from "@monaco-editor/react";
// import Navbar from './Components/Navbar';
import Navbar from './navbar';
import Axios from 'axios';
// import spinner from './spinner.svg';

function App() {

	// State variable to set users source code
	const [userCode, setUserCode] = useState(``);

	// State variable to set editors default language
	const [userLang, setUserLang] = useState("python");

	// State variable to set editors default theme
	const [userTheme, setUserTheme] = useState("vs-dark");

	// State variable to set editors default font size
	const [fontSize, setFontSize] = useState(20);

	// State variable to set users input
	const [userInput, setUserInput] = useState("");

	// State variable to set users output
	const [userOutput, setUserOutput] = useState("");

	// Loading state variable to show spinner
	// while fetching data
	const [loading, setLoading] = useState(false);

	const options = {
		fontSize: fontSize
	}

	// Function to call the compile endpoint
	function compile() {
		setLoading(true);
		if (userCode === ``) {
			return
		}

		// Post request to compile endpoint
		Axios.post(`http://localhost:8000/compile`, {
			code: userCode,
			language: userLang,
			input: userInput
		}).then((res) => {
			setUserOutput(res.data.output);
		}).then(() => {
			setLoading(false);
		})
	}

	// Function to clear the output screen
	function clearOutput() {
		setUserOutput("");
	}

	return (
		<div className="App">
			<Navbar
				userLang={userLang} setUserLang={setUserLang}
				userTheme={userTheme} setUserTheme={setUserTheme}
				fontSize={fontSize} setFontSize={setFontSize}
			/>
			<div className="main">
				<div className="left-container">
					<Editor
						options={options}
						height="calc(100vh - 50px)"
						width="100%"
						theme={userTheme}
						language={userLang}
						defaultLanguage="python"
						defaultValue="# Enter your code here"
						onChange={(value) => { setUserCode(value) }}
					/>
					<button className="run-btn" onClick={() => compile()}>
						Run
					</button>
				</div>
				<div className="right-container">
					<h4>Input:</h4>
					<div className="input-box">
						<textarea id="code-inp" onChange=
							{(e) => setUserInput(e.target.value)}>
						</textarea>
					</div>
					<h4>Output:</h4>
					{loading ? (
						<div className="spinner-box">
                            {/* <img src={spinner} alt="Loading..." /> */}
                            <p>loading..</p>
                        </div>
					) : (
						<div className="output-box">
							<pre>{userOutput}</pre>
							<button onClick={() => { clearOutput() }}
								className="clear-btn">
								Clear
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
