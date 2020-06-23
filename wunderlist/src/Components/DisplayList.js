import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth'

const DisplayList = ({task, id}) => {
    let updatedTask = {
        description: task.description,
        complete: task.complete,
    }
    const [newTask, setTask] = useState(updatedTask)


    const updateTask = () => {
        axiosWithAuth()
        .put(`/user/task/${id}`, newTask)
        .then(res => {
            console.log(res.data)
        })
        .catch(err=> {
            console.log(err)
        })
    }


    function handleChange(e){
        setTask({...newTask, [e.target.name]:e.target.checked})
        updateTask()
    }
    console.log('my new task', newTask)
    return (
        <>
        <h3>{task.description}
            <li>{task.complete ? "I am completed" : "I am not completed"}</li>
            <label>
            <input onChange={handleChange} name="complete" type="checkbox"></input>
                complete state
            </label>
            
        </h3>
        
        </>
    )
}

export default DisplayList