import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth'
import ToDoForm from './ToDoForm'
import styled from 'styled-components';
import DisplayCard from './DisplayCard'


const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;

    input {
        text-align: center;
        display: flex;
        height: 3%;
        width: 30%;
        margin: 1% auto;
    }
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

const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;



const getUserToDo = (id) => {
    axiosWithAuth().get(`/user/${id}/todos`).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}
const getUserTaskList = (id) => {
    axiosWithAuth().get(`/user/${id}/task`).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}
//this should handle the display
const Wunderlist = () => {
    const userID = useParams().id;
    const [newButton, setNewButton] = useState(false);
    const [toDoList, setToDoList] = useState();
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState();

    useEffect(()=> {
        axiosWithAuth().get(`/user/${userID}/todos`).then(res => {
            setToDoList(res.data)
            setSearchResult(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if(toDoList){
          const results = toDoList.filter(obj => {
            return obj.title.toLowerCase().includes(search.toLowerCase())
          })
          return setSearchResult(results)
        }
      }, [search]);

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    return (
        <MainContainer>
            <button onClick={() => {getUserToDo(userID)}}>test for get todos list</button>
            <button onClick={() => {getUserTaskList(userID)}}>test for get task list</button>
            <CardHeading>
                <h1>Welcome to Wunderlist 2.0</h1>
                <p>Please click on 'Add List' to get started.</p>
            </CardHeading>
            <ContentContainer >
                <button onClick={() => setNewButton(!newButton)}>Add List</button>
                {(newButton === true ? <ToDoForm setNewButton={setNewButton} /> : undefined)}
            </ContentContainer>
            <input name='Search' placeholder='Search For Task Name' onChange={handleSearch}/>
            <ContentContainer >
                {!searchResult
                ? <p>please hold</p>
                : searchResult.map(obj => {
                    return <DisplayCard key={obj.id} card={obj}/> 
                })}
            </ContentContainer>

        </MainContainer>
    )

}

export default Wunderlist