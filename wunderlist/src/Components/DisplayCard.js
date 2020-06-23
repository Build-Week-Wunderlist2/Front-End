import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ToDoForm from './ToDoForm';
import axiosWithAuth from '../utils/axiosWithAuth';
import {DarkGold, LightTan, BurntOrange, DarkPurple, LightPurple} from '../ColorPalette'
import EditTitleForm from './EditTitleForm'

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 1%;
    height: 100%;
    min-width: 30%;
    background: ${LightPurple};
    box-shadow: 2px 2px 3px 3px ${DarkPurple};
    

    p {
        display: flex;
        align-items: center;
        font-size: .8rem;
        width: 20%;
        padding: 1%;
        margin: 1%;
    }

`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1%;

    h2 {
        display: flex;
        align-items: center;
        margin: 0 1%;
        min-height: 3rem;
    }
`;

const CardButton = styled.button`
    height: ${props => props.button === "edit" ? '10%' : '2.5%'};
    width: ${props => props.button === "edit" ? undefined : '2.5%'};
    cursor: ${props => props.button === "edit" ? 'pointer' : "crosshair"};
    align-self: ${props => props.button === "delete" ? 'flex-start' : 'center'};
    background-color: ${props => props.button === "edit" ? DarkGold : BurntOrange};
    clip-path: ${props => props.button === "edit"
    ? 'polygon(92% 12%, 11% 10%, 10% 89%, 83% 91%, 35% 72%, 35% 59%, 78% 57%, 75% 42%, 41% 42%, 43% 26%, 88% 26%)'
    : 'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)'};
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
        <CardHeader>
            <CardButton button="edit" onClick={()=>editToDo(card)} />
            {(editing === true ? <EditTitleForm editing={editing} setEditing={setEditing} saveEdit={saveEdit} todoToEdit={todoToEdit} setToDoToEdit={setToDoToEdit}/> : <h2>{card.title}</h2>)}
            <p>{(card.created_at !== null ? (card.created_at.split('T')[0]): undefined)}</p>
            <CardButton button="delete" onClick={e =>{
                e.stopPropagation();
                deleteToDo(card)
                }
            }/>
        </CardHeader>
        <ToDoForm updateToDo={updateToDo} />
    </CardContainer>
    )}

export default DisplayCard
