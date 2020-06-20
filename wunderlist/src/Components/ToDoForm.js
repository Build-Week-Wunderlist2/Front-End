import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import axiosWithAuth from '../utils/axiosWithAuth';
import MainHeader from './MainHeader';
import * as yup from 'yup';



const ToDoForm = ({updateToDoList}) => {
    let date = new Date().toLocaleString().split(',')[0];
    const initialToDo = {
        title: "",
        complete: false,
        user_id: useParams().id,
        date: date,
    }

    const [addToDo, setAddToDo] = useState(initialToDo);
    const [editToDo, setToDo] = useState();

    const saveToDo = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/user/todos', addToDo)
        .then(res=>{
            updateToDoList(res.data);
            setAddToDo(initialToDo);
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
        <MainHeader />
        <form onSubmit={saveToDo}>
            <legend>Add To Do List</legend>
            <input name='title' onChange={handleChange} value={addToDo.something} placeholder='Name of Task'/>
            <button type="submit">Add</button>
        </form>
        </>
    )

}

export default ToDoForm; 