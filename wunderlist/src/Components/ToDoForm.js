import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import axiosWithAuth from '../utils/axiosWithAuth';



const ToDoForm = ({setNewButton, renderToDo, setRenderToDo}) => {
    let date = new Date().toLocaleString().split(',')[0];
    let userID = useParams().id;
    const initialToDo = {
        title: "",
        complete: false,
        user_id: userID,
        created_at: date,
    }
    
    const [addToDo, setAddToDo] = useState(initialToDo);

    const saveToDo = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/user/todos', addToDo)
        .then(res=>{
            // updateToDoList(res.data);
            setRenderToDo(!renderToDo)
            setNewButton(false)
            // setAddToDo(initialToDo);
        })
        .catch(err=>console.log("error: ", err));
    };

    const handleChange = e => {
        e.persist()
        setAddToDo({...addToDo, [e.target.name]: e.target.value})
        // validateChange(e)
    };


    return(
        <>
        <form onSubmit={saveToDo}>
            <input name='title' onChange={handleChange} value={addToDo.something} placeholder='Name of Task'/>
            <button type="submit">Add</button>
        </form>
        </>
    )

}

export default ToDoForm; 