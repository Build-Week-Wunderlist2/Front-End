import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth'
import ToDoForm from './ToDoForm'
import axios from 'axios';
import styled from 'styled-components';
import MainHeader from './MainHeader';


const CardContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 2%;
    height: 30vh;
    width: 30vw;
    border: 2px solid red;
`;

const CardTitle = styled.h2`
    text-align: center;
`;

const CardDate = styled.h2`
    text-align: center;
`;





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
    const [toDoList, setToDoList] = useState();
    const [searchResult, setSearchResult] = useState(toDoList);//future search
    useEffect(()=> {
        axiosWithAuth().get(`/user/${userID}/todos`).then(res => {
            setToDoList(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <>
        <MainHeader />
        <button onClick={() => {getUserToDo(userID)}}>test</button>
        
        <h1>Welcome to Wunderlist 2.0</h1>
        <p>Please click on Add Task to get started.</p>
        <p>You can click on the title at any time to return here.</p>
        <Link to={`/user/${userID}/todos/add`}><button style={{width: '25%'}}>Add A Todo List</button></Link>
        <div style={{display: 'flex'}}>
        {!toDoList
        ? <p>please hold</p>
        : toDoList.map(obj => {
            console.log(obj)//insert component here
        return (
        <CardContainer key={obj.id}>
            <CardTitle>{obj.title}</CardTitle>
            <CardDate>{(obj.date !== null ? (obj.date.split('T')[0]): undefined)}</CardDate>
        </CardContainer>)
        })}
        </div>

        </>
    )

}

export default Wunderlist