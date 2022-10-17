import React, { useEffect, useState} from 'react';

import './Todolist.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan,faPencil } from "@fortawesome/free-solid-svg-icons";
import{ useNavigate, useParams } from "react-router-dom";
const Todolist = ({ToDos})=>{
  const {id}= useParams()
  const navigate = useNavigate()
  const [bodys, setBody] = useState();
  const [btn,setbtn]=useState('')
  console.log(bodys)
  const date = new Date().toLocaleString()

const Edit = (id,bodys) =>{
  setBody(bodys)
 
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
    }

    })
      .then(() => {
      
      })
      .catch(err => console.log(err));
    
  }
  const DeleteClick= (id) =>{
    fetch(`http://localhost:3001/Todo/${id}`, {
      method:"DELETE",
           headers: {
        'Content-Type': 'application/json'
    }

    })
      .then(() => {
        navigate('/todo')
     
      })
      .catch(err => console.log(err));
      console.log(id)
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
          {ToDos.map((item)=>{
            return(
             <li id="Todolist" key={item.id}>
             <form>
             <span className='NoteTitle'>{item.bodys}</span> <br/>
             <span className='NoteDate'>{date}</span>
               <button  id='delbutton' onClick={()=>{DeleteClick(item.id)}}  ><FontAwesomeIcon icon={faTrashCan} color="#FFF6C7" size='lg' /></button>
                 <button id='editbutton' onClick={()=>{Edit(item.id,item.bodys)}}>  <FontAwesomeIcon   icon={faPencil} color="#FFF6C7" size='lg'  /> </button>
                 </form>
           </li>
)})}
         </ul>
     
      </div>
    </div>
</div>
)}
export default Todolist