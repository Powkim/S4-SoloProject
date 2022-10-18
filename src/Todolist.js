import React, { useEffect, useState,useRef} from 'react';

import './Todolist.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan,faPencil } from "@fortawesome/free-solid-svg-icons";
import{ useNavigate, useParams } from "react-router-dom";

const Todolist = ({ToDos})=>{
  const {id}= useParams()
  const navigate = useNavigate()
  const [bodys, setBody] = useState('');
  const [Edited, setEdited] = useState('');
  const [btn,setbtn]=useState('')
const focusinput=useRef(0)  
  
  const date = new Date().toLocaleString()

const edit = (bodys,id,date)=>{
  const putData = {"bodys":bodys,"Edit":true,"Date":date,"id":id}
  setEdited(...bodys) 
  fetch(`http://localhost:3001/Todo/${id}`,{
          method:"PUT",
          body : JSON.stringify( putData ),
          headers: {
            'Content-Type': 'application/json'
        },
        })
        .then( () => {
     
window.location.reload()
        })
        .catch( err => console.log(err) )
     
  console.log(Edited)
}

const editComplite = (id,bodys,date)=>{
  const putData = {"bodys":Edited,"Edit":false,"Date":date,"id":id}
  const putData2 = {"bodys":bodys,"Edit":false,"Date":date,"id":id}
  if(Edited===''){
    fetch(`http://localhost:3001/Todo/${id}`,{
      method:"PUT",
      body : JSON.stringify( putData2 ),
      headers: {
        'Content-Type': 'application/json'
    },
    })
    .then( () => {
   
window.location.reload()
    })
    .catch( err => console.log(err) )
 
  }
  else {
    fetch(`http://localhost:3001/Todo/${id}`,{
      method:"PUT",
      body : JSON.stringify( putData ),
      headers: {
        'Content-Type': 'application/json'
    },
    })
    .then( () => {
   
window.location.reload()
    })
    .catch( err => console.log(err) )
 
console.log(bodys)
  }
 
}
const onDefault=(e)=>{
e.preventDefault();
}
  const Submit=(e) =>{
    e.preventDefault();
    console.log('함수 실행중!')
    const title={"bodys":bodys,"Edit":false,"Date":date}
    fetch('http://localhost:3001/Todo', {
      method:"POST",
      body : JSON.stringify( title ),
      headers: {
        'Content-Type': 'application/json'
    }

    })
      .then(() => {
        navigate('/')
        window.location.reload()
      })
      .catch(err => console.log(err));
    setBody('')
  }
  const DeleteClick= (id) =>{
    fetch(`http://localhost:3001/Todo/${id}`, {
      method:"DELETE",
           headers: {
        'Content-Type': 'application/json'
    }

    })
      .then(() => {
        navigate('/')
  window.location.reload()
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
            <input id="Todoinput" type='text' placeholder='type your Todolist'  value={bodys} onChange={(e)=>setBody(e.target.value)}></input>
<button id='Todobutton' >입력
  </button>  
            </form>
      </div>
      <div id='listwrap'>
      <ul>
          {ToDos.map((item)=>{
            return(
             <li id="Todolist" key={item.id}>
            {item.Edit? <form onSubmit={onDefault}>
             <input onChange={(e)=>setEdited(e.target.value)}  id='Edit' defaultValue={item.bodys}></input> <br></br>
             <button  className='EditComplite' onClick={()=>{editComplite(item.id,item.bodys,item.Date)}}>  <FontAwesomeIcon   icon={faPencil} color="#FFF6C7" size='lg'  /> </button>
             <span className='NoteDate'>{item.Date}</span>
                 </form>
                 :<form onSubmit={onDefault}>
             <span className='NoteTitle'>{item.bodys}</span> <br/>
             <span className='NoteDate'>{item.Date}</span>
               <button  id='delbutton' onClick={()=>{DeleteClick(item.id)}}  ><FontAwesomeIcon icon={faTrashCan} color="#FFF6C7" size='lg' /></button>
                 <button id='editbutton'onClick={()=>{edit(item.bodys,item.id,item.Date)}}>  <FontAwesomeIcon   icon={faPencil} color="#FFF6C7" size='lg'  /> </button>
                 </form>}
           </li>
)})}
         </ul>
     
      </div>
    </div>
</div>
)}
export default Todolist