import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import MainHeader from './MainHeader'

const initialToDo = {
    
}

const ToDoForm = ({updateToDoList}) => {
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

    return(
        <>
        <MainHeader />
        <form onSubmit={saveToDo}>
            <legend>Add To Do List</legend>
            <input onChange={e=>
                setAddToDo({...addToDo, [e.target.name]: e.target.value
                })
            }
                value={addToDo.something}
                placeholder='What Needs To Be Done'
            />
        </form>
        </>
    )

}

export default ToDoForm; 