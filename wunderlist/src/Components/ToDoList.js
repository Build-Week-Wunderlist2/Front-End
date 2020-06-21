import React, {useState, useEffect} from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import ToDoForm from './ToDoForm';

const initialToDo = {
    title: '',
    complete: false,
    user_id: `${user_id}`,
};

const initialTask = {
    description: '',
    complete: false,
    task_id: `${id}`,
    repeatsDaily: false,
    repeatsWeekly: false,
    repeatsMonthly: false
};

const ToDoList =({todo, updateToDo}) => {
    console.log(todo);
    const [editing, setEditing] = useState(false);
    const [editToDo, setEditToDo] = useState(initialToDo);
    const [editTask, setEditTask] = useState(initialTask);

    const editTodo = todo => {
        setEditing(true);
        setEditToDo(todo);
    };

    const saveToDo = (e) => {
        e.preventDefault();
        type === 'todo' ? 
        axiosWithAuth()
        .put(`/user/todos/${editTodo.id}`, editToDo)
        .then(res => {
            this.handleReload();
        })
        .catch(err => {
            console.error(
                err.message,
                err.response
            );
        }) : axiosWithAuth()
        .put(`/user/task/${editTask.id}`, editTask)
        .then(res => {
            this.handleReload();
        })
        .catch(err => console.error(err.message));
        
    };

    const deleteToDo = todo => {
        type === 'todo' ? 
        axiosWithAuth()
        .delete(`user/todos/${todo.id}`)
        .then(res => {
            setEditToDo(res.data);
        })
        .catch(err => { console.error(   
                err.message,
                err.response
            );
        }) : axiosWithAuth()
        .delete(`user/${id}/task`)
        .then(res => {
            setEditTask(res.data);
        })
        .catch(err => { 
            console.error(
            err.message
           );
        });
       };


    return(
        <div className="todo-wrap">
        <p>To Do's</p>
        <ul>
            {todos.map(todo=>(
                <li key={todo.id} onClick={()=>editToDo(todo)}>
                    <span>
                        <span className="delete" onClick={e =>{
                            e.stopPropagation();
                            deleteToDo(todo)
                        }}>
                            Delete
                        </span>{" "}
                        {todo.title}
                        {todo.complete}
                        {todo.user_id}
                    </span>
                </li> 
              
            ))}
        </ul>
        {type ==='todo' ? editing && (
            <form onSubmit={saveToDo}>
                <legend>Edit To Do</legend>
                <label>To Do:
                    <input
                    onChange={e=>
                    setEditToDo({...editToDo, title: e.target.value})
                }
                value={editToDo.title}
                    />
                </label>
            </form>
        ) : editing && ( 
        <form onSubmit ={saveToDo}>
            <legend>Edit Task</legend>
            <label>Task:
                <input onChange ={e=>setEditTask({...editToDo,description: e.target.value})
                }
                value={editToDo.description}
                />
            </label>
        </form>
        )}

    </div>
    )}

export default ToDoList;
