import React, {useState} from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const initialToDo = {
    
}

const ToDoForm = ({updateToDoList}) => {
    const [addToDo, setAddToDo] = useState(initialToDo);
    const [editToDo, setToDo] = use

    const saveToDo = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/user/todos', addToDo)
        .then(res=>{
            updateToDoList(res.data);
            setAddToDo(initialToDo);
        })
        .catch(err=>console.log("error: ", err));
    };

    return(
        <form onSubmit={saveToDo}>
            <legend>Add To Do</legend>
            <input onChange={e=>
                setAddToDo({...addToDo, something: e.target.value
                })
            }
                value={addToDo.something}
                placeholder='What Needs To Be Done'
            />
        </form>
    )

}

export default ToDoForm; 