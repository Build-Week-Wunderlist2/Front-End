import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';


const TaskForm = ({id, setRenderToDo, renderToDo}) => {
    let date = new Date().toLocaleString().split(',')[0];

    const initialTask = {
       description: "", 
       complete: false,
       created_at: date,
       task_id: id,
       repeatsDaily: false,
       repeatsWeekly: false,
       repeatsMonthly: false
    }

    const [addTask, setAddTask] = useState(initialTask);

    const saveTask = e => {
     e.preventDefault()
     axiosWithAuth()
        .post('/user/task', addTask)
        .then(res => {
            console.log(addTask);
        })
        .catch(err => console.error(err.message, err.response))
}


    const handleChange = e => {
        e.preventDefault();
         setAddTask({...addTask, [e.target.name]: e.target.value});
        }

    const handleChecked = e => {
        setAddTask({...addTask,[e.target.name]: e.target.checked})
    }

     return(
        <>
        <form onSubmit={saveTask}>
            <input name='description' onChange={handleChange} value={addTask.value} placeholder='Name of Task'/>
            <p>{initialTask.repeatsDaily ? true : false} Repeat Daily
            <input onChange={handleChecked} name="repeatsDaily" type="checkbox"></input>
            </p>
            <p>{initialTask.repeatsWeekly ? true : false} Repeat Weekly
            <input onChange={handleChecked} name="repeatsWeekly" type="checkbox"></input>
            </p>
            <p>{initialTask.repeatsMonthly ? true : false} Repeat Monthly
            <input onChange={handleChecked} name="repeatsMonthly" type="checkbox"></input>
            </p>
            <button type="submit">Add</button>
        </form>
        </>
     )
}

export default TaskForm;