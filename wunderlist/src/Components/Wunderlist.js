import React from 'react';
import { Link, useParams, Route } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth'
import ToDoForm from './ToDoForm'
import axios from 'axios';
import styled from 'styled-components';

const getUserToDo = (id) => {
    axiosWithAuth().get(`/user/${id}/todos`).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}
//this should handle the display
const Wunderlist = () => {
    const userID = useParams().id;
    return (
        <>
        {/* <button onClick={() => {getUserToDo(userID)}}>test</button> */}
        
        <h1>Welcome to Wunderlist 2.0</h1>
        <p>Please click on Add Task to get started.</p>
        <p>You can click on the title at any time to return here.</p>
        <Link to={`/user/${userID}/todos/add`}><button style={{width: '25%'}}>Add A Todo List</button></Link>

        </>
    )

}

export default Wunderlist