import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import axiosWithAuth from '../utils/axiosWithAuth';
import styled from 'styled-components';

const ToDoFormInput = styled.input`
    border-radius: 10px;
    width: 70%;
    margin: 1%;
    height: 1.8rem;
`;

const ToDoFormButton = styled.button`
    border-radius: 10px;
    width: 20%;
`;



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
    };


    return(
        <>
        <form style={{display: 'flex', width: '30%', justifyContent: 'center',}}onSubmit={saveToDo}>
            <ToDoFormInput name='title' onChange={handleChange} value={addToDo.something} placeholder='Name of Task'/>
            <ToDoFormButton type="submit">Add</ToDoFormButton>
        </form>
        </>

     )

}

export default ToDoForm; 