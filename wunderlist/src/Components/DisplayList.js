
import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth'
import EditTaskForm from './EditTaskForm';
import Switch from './Switch';
import styled from 'styled-components';
import {DarkGold, LightTan, BurntOrange, DarkPurple, LightPurple} from '../ColorPalette'


const completeBackground = 'rgba(64, 86, 161, .3)';

const DisplayListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({complete}) => complete ? completeBackground : undefined};
    margin: 1%;
    border-radius: 15px;
    max-height: 2em;
`;

const DisplayListHeader = styled.h3`
    margin-left: 1%;
`;


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
        <DisplayListContainer complete={task.complete}>
            <DisplayListHeader>{task.description}</DisplayListHeader>
            <Switch task={task} id={id} setRenderToDo={setRenderToDo} renderToDo={renderToDo}/>
        </DisplayListContainer>
        {(editing === true ? <EditTaskForm editing={editing} setEditing={setEditing} updateTask={updateTask} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} task={task}/> : <h3>{task.description}</h3>
      )}
        <button button="edit" onClick={()=>editTask(task)} />
        <button button="delete" onClick={e=>{
            e.preventDefault();
            deleteTask(task);
        }
            <li>{task.repeatsDaily === true ? "This will run daily" : task.repeatsWeekly === true ? "This will run Weekly" : task.repeatsMonthly === true ? "This will run Monthly" : "" }</li>
        </>            

    )
}

export default DisplayList