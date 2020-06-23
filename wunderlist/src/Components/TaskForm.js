import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';


const TaskForm = ({id, setRenderToDo, renderToDo, setNewButton}) => {
    let date = new Date().toLocaleString().split(',')[0];

    const initialTask = {
       description: "", 
       complete: false,
       date: date,
       task_id: id,
      }

    const [addTask, setAddTask] = useState(initialTask);

    const saveTask = e => {
    e.preventDefault();
    axiosWithAuth()
        .post(`/user/task/`, addTask)
        .then(res => {
           setRenderToDo(!renderToDo);
           setNewButton(false);
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
            <input name='description' onChange={handleChange} value={addTask.value} placeholder='Name of Task'/>
            <button type="submit">Add</button>
        </form>
        </>
     )
}

export default TaskForm;
