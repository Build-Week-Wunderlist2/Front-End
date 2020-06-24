import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';


const TaskForm = ({ id, renderToDo, setRenderToDo }) => {
    let date = new Date().toLocaleString().split(',')[0];

    const initialTask = {
       task_id: id,
       description: "",
       complete: false, 
       repeatsDaily: false,
       repeatsWeekly: false,
       repeatsMonthly: false,
       created_at: date,
    }

    const [addTask, setAddTask] = useState(initialTask);

    const saveTask = e => {
     e.preventDefault()
     axiosWithAuth()
        .post('/user/task', addTask)
        .then(res => {
            console.log('taskform addtask', addTask);
            setRenderToDo(!renderToDo)
            setAddTask(initialTask)
        })
        .catch(err => console.error(err.message, err.response))
}

     const handleChange = e => {
        e.preventDefault();
       setAddTask({...addTask, [e.target.name]: (e.target.type==="checkbox" ? e.target.checked : e.target.value)});
        }

     return(
        <>
        <form onSubmit={saveTask}>
            <input name='description' onChange={handleChange} value={addTask.value} placeholder='Name of Task'/>
            <p>{initialTask.repeatsDaily ? true : false} Repeat Daily
            <input onChange={handleChange} name="repeatsDaily" type="checkbox"></input>
            </p>
            <p>{initialTask.repeatsWeekly ? true : false} Repeat Weekly
            <input onChange={handleChange} name="repeatsWeekly" type="checkbox"></input>
            </p>
            <p>{initialTask.repeatsMonthly ? true : false} Repeat Monthly
            <input onChange={handleChange} name="repeatsMonthly" type="checkbox"></input>
            </p>
            <button type="submit">Add</button>
        </form>
        </>
     )
}

export default TaskForm;