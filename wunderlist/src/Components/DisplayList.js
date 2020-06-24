import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth'
import EditTaskForm from './EditTaskForm';



const DisplayList = ({task, id, setRenderToDo, renderToDo}) => {

    let updatedTask = {
        id: id,
        description: task.description,
        complete: task.complete,
        repeatsDaily: task.repeatsDaily,
        repeatsWeekly: task.repeatsWeekly,
        repeatsMonthly: task.repeatsMonthly,
     };

    const [editing, setEditing] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(updatedTask);


    const editTask = tasks => {
        setEditing(!editing);
        setTaskToEdit(tasks);
    }


    const updateTask = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .put(`/user/task/${id}`, taskToEdit)
        .then(res => {
            setRenderToDo(!renderToDo);
            setEditing(false);
        })
        .catch(err=> {
            console.log(taskToEdit)
            console.error(err.message, err.response)
        })
    }

    const deleteTask = () => {
        axiosWithAuth()
        .delete(`/user/task/${id}`)
        .then(res=>{
            setTaskToEdit(res.data);
            setRenderToDo(!renderToDo)
        })
        .catch(err=>{console.error(
            err.message,err.response
        )})
    }

    function handleChange(e){
        e.stopPropagation(); 
        setTaskToEdit({...task, [e.target.name]:e.target.checked})
        
    }
    // console.log('my new task', newTask)
    return (
        <>
        {(editing === true ? <EditTaskForm editing={editing} setEditing={setEditing} updateTask={updateTask} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} task={task}/> : <h3>{task.description}</h3>
      )}
        <button button="edit" onClick={()=>editTask(task)} />
        <button button="delete" onClick={e=>{
            e.preventDefault();
            deleteTask(task);
        }} />
            <li>{task.complete ? "I am completed" : "I am not completed"}</li>
            <li>{task.repeatsDaily === true ? "This will run daily" : task.repeatsWeekly === true ? "This will run Weekly" : task.repeatsMonthly === true ? "This will run Monthly" : "" }</li>
            <label>
            <input onChange={handleChange} name="complete" type="checkbox"></input>
                complete state
            </label>
            
 
        </>
    )
}

export default DisplayList