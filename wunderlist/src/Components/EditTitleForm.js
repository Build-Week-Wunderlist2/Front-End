import React from 'react';
import styled from 'styled-components';
import {DarkGold, LightTan, BurntOrange, DarkPurple, LightPurple} from '../ColorPalette'

const EditTitle = styled.form`
    display: flex;
    align-items: center;
    background: none;
    min-height: 3rem;
    
    input {
        background: none;
        border: 1px solid ${DarkGold};

    }
`;

const EditTitleForm = ({todoToEdit, saveEdit, editing, setToDoToEdit, setEditing}) => {
    return (<>
         {editing && (
            <EditTitle onSubmit={saveEdit}>
                <label>
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
        </EditTitle>
        )}
        </>
    )
}

export default EditTitleForm