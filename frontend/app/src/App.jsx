import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import { Notes } from './components/Notes';
import Signup from './components/Signup';


function App() {


  return (
    <>
       <h1>Notes App</h1>
     <Routes>
    
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/notes" element={<Notes/>}/>

     </Routes>
    </>
  )
}

export default App
