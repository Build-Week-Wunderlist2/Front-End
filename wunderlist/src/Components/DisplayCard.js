import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ToDoForm from './ToDoForm';
import axiosWithAuth from '../utils/axiosWithAuth';

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 1%;
    height: 100%;
    min-width: 30%;
    border: 2px solid red;

    p {
        width: 10%;
        padding: 1%;
        margin: 1%;
    }

`;

const CardHeader = styled.div`

`;

const initialToDo = {
    title: '',
    complete: false,
};

const initialTask = {
    description: '',
    complete: false,
    repeatsDaily: false,
    repeatsWeekly: false,
    repeatsMonthly: false
};


const DisplayCard = ({ card, type, updateToDo, userID, id, renderToDo, setRenderToDo }) => {
    const [editing, setEditing] = useState(false);
    const [todoToEdit, setToDoToEdit] = useState(initialToDo);
    const [taskToEdit, setTaskToEdit] = useState(initialTask);

    const editToDo = cards => {
       setEditing(!editing);
       setToDoToEdit(cards);
    };
    const saveEdit = e => {
        e.preventDefault();
        type === 'todo' ? 
        axiosWithAuth()
        .put(`/user/todos/${id}`, todoToEdit)
        .then(res => {
            setRenderToDo(!renderToDo)
            setEditing(false)
            // this.handleReload();
        })
        .catch(err => {
            console.error(
                err.message,
                err.response
            );
        }) : axiosWithAuth()
        .put(`/user/task/${userID}`, taskToEdit)
        .then(res => {
            this.handleReload();
        })
        .catch(err => console.error(err.message));
        
    };

        const deleteToDo = () => {
    //    type==='todo' ?
         axiosWithAuth()
        .delete(`user/todos/${id}`)
        .then(res => {
        setToDoToEdit(res.data);
        setRenderToDo(!renderToDo)
        console.log(res)
        })
        .catch(err => { console.error(   
                err.message,
                err.response
            );
        }) 
        // : axiosWithAuth()
        // .delete(`user/:id/task`)
        // .then(res => {
        //     setTaskToEdit(res.data);
        // })
        // .catch(err => { 
        //     console.error(
        //     err.message
        //    );
        };
   
    return (
    <CardContainer>
        <button key={card.title} onClick={()=>editToDo(card)}>Edit</button>
        <button onClick={e =>{ e.stopPropagation();
            deleteToDo(card)
            }
        }>Delete</button>
        <h2>{card.title}</h2>
        <p>{(card.created_at !== null ? (card.created_at.split('T')[0]): undefined)}</p>
         {editing && (
            <form onSubmit={saveEdit}>
                <legend>Edit To Do</legend>
                <label>
                    To Do
                    <input
                    onChange={e=>
                    setToDoToEdit({...todoToEdit, title: e.target.value})
                }
                value = {
                    todoToEdit.title
                }
                />
                </label>
        
        
        {/* : editing && ( 
        <form onSubmit ={saveEdit}>
            <legend>Edit Task</legend>
            <label>Task:
                <input onChange ={e=>setEditTask({...editToDo,description: e.target.value})
                }
                value={editToDo.description}
                />
            </label>
        </form>
        )} */}
        {/* <ToDoForm updateTodo={updateToDo}/> */}
            <button type="submit">save</button>
            <button onClick={()=>setEditing(false)}>cancel</button>
        </form>
        )}
    <ToDoForm updateToDo={updateToDo} />
    </CardContainer>
    )}

export default DisplayCard
