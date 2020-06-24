import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';


const TaskForm = ({ id, renderToDo, setRenderToDo }) => {
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
            // console.log('taskform addtask', addTask);
            setRenderToDo(!renderToDo)
            setAddTask(initialTask)
            console.log('my add task', addTask)
        })
        .catch(err => console.error(err.message, err.response))
    }
    
    const handleChange = e => {
       e.preventDefault();
       setAddTask({...addTask, [e.target.name]: e.target.value});
        }
    
    const handleSelection = (e) => {
        const newSelection = e.target.value;
        setAddTask({...addTask, [newSelection] : true});

        //possibly a conditional here to set the others back to false.
        //could also build custom component for onClicks
        //had a ton of issues with options not passing e.target.name
    }


     return(
        <>
        <form onSubmit={saveTask}>
            <input name='description' onChange={handleChange} value={addTask.description} placeholder='Name of Task'/>
            <select onChange={(e) => handleSelection(e)}>
                <option>Never</option>
                <option value='repeatsDaily'>Daily</option>
                <option value='repeatsWeekly'>Weekly</option>
                <option value='repeatsMonthly'>Monthly</option>
            </select>
            <button type="submit">Add</button>
        </form>
        </>
     )
}

export default TaskForm;
