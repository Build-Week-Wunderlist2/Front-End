import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth'
import ToDoForm from './ToDoForm'
import styled from 'styled-components';
import DisplayCard from './DisplayCard'
import {DarkGold, LightTan, BurntOrange, DarkPurple, LightPurple} from '../ColorPalette'


const MainContainer = styled.div`
    height: 100vh;
    width: 100vw;
`;

const SearchInput = styled.input`
    text-align: center;
    display: flex;
    height: 3%;
    width: 30%;
    margin: 1% auto;
`;

const CardHeading = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    h1 {
        font-size: 2.4rem;
        text-shadow: 2px 2px ${DarkGold};
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

const ContentAddToDo = styled.button`
    display: flex;
    justify-content: center;
    align-content: center;
    height: 1.8rem;
    width: 20%;
    border-radius: 10px;
    background: ${LightPurple};
    font-size: 1.3rem;
`;



const getUserToDo = (id) => {
    axiosWithAuth().get(`/user/${id}/todos`).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}
const getUserTaskList = (id) => {
    axiosWithAuth().get(`/user/33/task`).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

const testing = {
    description: 'hello and hello',
    task_id: 33
}

const PostUserTask = (id) => {
    axiosWithAuth().post(`/user/task`, testing).then(res => {
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
    const [renderToDo, setRenderToDo] = useState(false)

    useEffect(()=> {
        axiosWithAuth().get(`/user/${userID}/todos`).then(res => {
            setToDoList(res.data)
            setSearchResult(res.data.sort((a, b) => (a.id > b.id) ? -1 : 1))
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [renderToDo])

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
            {/* <button style={{width: '25%', height: '4.5vh', fontSize: '1.5rem'}} onClick={() => {getUserToDo(userID)}}>test for get todos list</button>
            <button style={{width: '25%', height: '4.5vh', fontSize: '1.5rem'}} onClick={() => {getUserTaskList(userID)}}>test for get task list</button> */}

            <CardHeading>
                <h1>Welcome to Wunderlist 2.0</h1>
                <p>Please click on 'Add List' to get started.</p>
            </CardHeading>
            <ContentContainer >
                {(newButton === true
                ? <ToDoForm setRenderToDo={setRenderToDo} setNewButton={setNewButton} renderToDo={renderToDo} />
                : <ContentAddToDo onClick={() => setNewButton(!newButton)}>Add List</ContentAddToDo>)}
            </ContentContainer>
            <SearchInput  name='Search' placeholder='Search For Task Name' onChange={handleSearch}/>
            <ContentContainer >
                {!searchResult
                ? <p>please hold</p>
                : searchResult.map(obj => {
                    return <DisplayCard type='todo' key={obj.id} id={obj.id} card={obj} userID={userID} setRenderToDo={setRenderToDo} renderToDo={renderToDo}/> 
                })}
            </ContentContainer>

        </MainContainer>
    )

}

export default Wunderlist