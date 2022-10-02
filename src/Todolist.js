import React, { useEffect, useState} from 'react';
import './Todolist.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faFilePen,faPencil,faMagnifyingGlass, faArrowsTurnToDots } from "@fortawesome/free-solid-svg-icons";

const Todolist = ()=>{
  const [ToDos, setToDos] = useState(null);
  const [error, setError] = useState(null);
  const [bodys, setBody] = useState('');
  const date = new Date().toLocaleString()
  useEffect(() => {
    setTimeout(() => {
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
    }, 1000);
  }, [])
  console.log(ToDos)
const onclick=(e)=>{
e.preventDefault();

}
  const Submit=(e) =>{
    e.preventDefault();
    console.log('함수 실행중!')
    const title={bodys}


    fetch('http://localhost:3001/Todo', {
      method:"POST",
      body : JSON.stringify( title ),
      headers: {
        'Content-Type': 'application/json'
    },

    })
      .then(() => {

        window.location.reload();
      })
      .catch(err => console.log(err));
  
  }
 
return(
<div id="wrap">
    <div id="Todowrap">
      <div id='titlewrap'>
        <span>My To-Do list</span>
        <form id="Todoform" onSubmit={Submit} >
            <input id="Todoinput" type='text' placeholder='type your Todolist' value={bodys} onChange={(e)=>setBody(e.target.value)}></input>
<button id='Todobutton' >입력
  </button>  
            </form>
      </div>
      <div id='listwrap'>
      <ul>
          {ToDos.map(item=>(
             <li id="Todolist" key={item.id}>
             <form>
             <span className='NoteTitle'>{item.body}</span> <br/>
             <span className='NoteDate'>{date}</span>
               <button  id='delbutton'  ><FontAwesomeIcon icon={faTrashCan} color="#FFF6C7" size='lg' /></button>
                 <button id='editbutton' >  <FontAwesomeIcon   icon={faPencil} color="#FFF6C7" size='lg'  /> </button>
                 </form>
           </li>
          ))}
         </ul>
     
      </div>
    </div>
</div>
)}
export default Todolist