import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Entry from "./components/Entry";
import Editor from './components/Editor';
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>

            <Route path='/' element={<Entry/>} />
            <Route path='/Editor/:roomId' element={<Editor/>}  />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
