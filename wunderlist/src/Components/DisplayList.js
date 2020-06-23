import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axiosWithAuth from '../utils/axiosWithAuth'



const DisplayList = ({task, id, setRenderToDo, renderToDo }) => {

    let updatedTask = {
        id: id,
        description: task.description,
        complete: task.complete,
    }
    const [newTask, setTask] = useState(updatedTask)
    


    const updateTask = () => {
        axiosWithAuth()
        .put(`/user/task/${id}`, newTask)
        .then(res => {
            setRenderToDo(!renderToDo)
            console.log(res)
        })
        .catch(err=> {
            console.log(err)
        })
    }

    useEffect(()=> {
        updateTask()

        return undefined
    }, [newTask])

    function handleChange(e){
        e.stopPropagation(); 
        setTask({...newTask, [e.target.name]:e.target.checked})
        
    }
    // console.log('my new task', newTask)
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