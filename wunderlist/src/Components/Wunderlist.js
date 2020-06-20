import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth'
import ToDoForm from './ToDoForm'
import styled from 'styled-components';
import DisplayCard from './DisplayCard'


const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
`;

const CardHeading = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    h1 {
        font-size: 2.4rem;
    }

    p {
        font-size: 1.5rem;
    }
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
    const [newButton, setNewButton] = useState(false);
    const userID = useParams().id;
    const [toDoList, setToDoList] = useState();
    const [searchResult, setSearchResult] = useState(toDoList);//future search
    useEffect(()=> {
        axiosWithAuth().get(`/user/${userID}/todos`).then(res => {
            setToDoList(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [newButton])
    console.log(toDoList)
    console.log(newButton)
    return (
        <MainContainer>
            {/* <button onClick={() => {getUserToDo(userID)}}>test</button> */}
            <CardHeading>
                <h1>Welcome to Wunderlist 2.0</h1>
                <p>Please click on 'Add List' to get started.</p>
            </CardHeading>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <button onClick={() => setNewButton(!newButton)}>Add List</button>
                {(newButton === true ? <ToDoForm setNewButton={setNewButton} /> : undefined)}
            </div>
            {/* <Link to={`/user/${userID}/todos/add`}><button style={{width: '25%'}}>Add List</button></Link> */}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {!toDoList
                ? <p>please hold</p>
                : toDoList.map(obj => {
                    return <DisplayCard key={obj.id} card={obj}/> 
                })}
            </div>

        </MainContainer>
    )

}

export default Wunderlist