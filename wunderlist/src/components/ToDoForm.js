import React, {useState} from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const initialToDo = {
    
}

const ToDoForm = ({updateToDoList}) => {
    const [addToDo, setAddToDo] = useState(initialToDo);;

    const saveToDo = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/', addToDo)
        .then(res=>{
            updateToDoList(res.data);
            setAddToDo(initialToDo);
        })
        .catch(err=>console.log("error: ", err));
    }
}

export default ToDoForm; 