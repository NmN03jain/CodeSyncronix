import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Entry from "./components/Entry";
import Editor from './components/Editor';
import Collaborate from './components/Collaborate';
import './components/Collaborate.css';



function App() {

  
  return (
    <>
      
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Entry/>} />
            <Route path='/Editor/:roomID' element={<Editor/>}  />
            <Route path='/Collaborate' element={<Collaborate/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
