
import React, { useEffect, useState} from 'react';
import './App.css';
import Todolist from './Todolist'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [ToDos, setToDos] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
   
      fetch('http://localhost:3001/Todo')
      .then(res => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
    
        setToDos(data);

      })
      .catch(err => {

        setError(err.message);
      })
 
  }, [])
  return (
    <BrowserRouter>
   <div>
   <Routes>
   <Route exact path="/" element={<Todolist ToDos={ToDos} />} />
     </Routes>
     </div>
     </BrowserRouter>
  );
}

export default App;
