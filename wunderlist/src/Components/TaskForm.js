import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import axiosWithAuth from '../utils/axiosWithAuth';


const TaskForm = (props) => {
    let date = new Date().toLocaleString().split(',')[0];
    let todoID = useParams().id;

    const initialTask = {
       description: "", 
       complete: false,
       task_id: todoID,
       created_at: date,
    }

    const [addTask, setAddTask] = useState(initialTask);

    const saveTask = e => {
    e.preventDefault();
    axiosWithAuth()
        .post(`/user/task/`, addTask)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.error(err.message, err.respsonse))
}


    const handleChange = e => {
        e.persist()
        setAddTask({...addTask, [e.target.name]: e.target.value})
        // validateChange(e)
    };

     return(
        <>
        <form onSubmit={saveTask}>
            <input name='title' onChange={handleChange} value={addTask.value} placeholder='Name of Task'/>
            <button type="submit">Add</button>
        </form>
        </>
     )
}

export default TaskForm;
