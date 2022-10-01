import React from 'react';
import './Todolist.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faFilePen,faPencil,faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Todolist = ()=>{
const date = new Date().toLocaleString()
return(
<div id="wrap">
    <div id="Todowrap">
      <div id='titlewrap'>
        <span>My To-Do list</span>
        <form id="Todoform">
            <input id="Todoinput" type='text' placeholder='type your Todolist'></input>
<button id='Todobutton'>입력
  </button>  
            </form>
      </div>
      <div id='listwrap'>
      <li id="Todolist">
    <form>
    <span className='NoteTitle'>Todolist</span> <br/>
    <span className='NoteDate'>{date}</span>
      <button  id='delbutton'  ><FontAwesomeIcon icon={faTrashCan} color="#FFF6C7" size='lg' /></button>
        <button id='editbutton' >  <FontAwesomeIcon   icon={faPencil} color="#FFF6C7" size='lg'  /> </button></form>
  </li>
      </div>
    </div>
</div>
)}
export default Todolist