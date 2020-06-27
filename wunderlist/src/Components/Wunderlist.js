import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import ToDoForm from "./ToDoForm";
import styled from "styled-components";
import DisplayCard from "./DisplayCard";
import { device } from "../Breakpoints";
import { DarkGold, LightPurple } from "../ColorPalette";

import {ToDoContext} from "../contexts/ToDoContext";

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

  @media ${device.laptopL} {
    width: 40%;
  }

  @media ${device.laptop} {
    width: 75%;
  }

  @media ${device.tablet} {
    width: 90%;
    margin: 1% auto;
  }
`;

const CardHeading = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 2.4rem;
    text-shadow: 2px 2px ${DarkGold};

    @media ${device.mobileL} {
      font-size: 2rem;
    }

    @media ${device.mobileM} {
      font-size: 1.7rem;
    }
  }
  p {
    font-size: 1.5rem;

    @media ${device.mobileL} {
      font-size: 1.3rem;
    }

    @media ${device.mobileM} {
      font-size: 1rem;
    }
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

  @media ${device.laptop} {
    width: 40%;
  }

  @media ${device.tablet} {
    width: 60%;
  }
`;

//this should handle the display
const Wunderlist = () => {
  const userID = useParams().id;
  const [newButton, setNewButton] = useState(null);
  const [toDoList, setToDoList] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [renderToDo, setRenderToDo] = useState(null);


  useEffect(()=>{
    setNewButton(false);
    setRenderToDo(false);
  },[]);

  useEffect(() => {
    axiosWithAuth()
      .get(`/user/${userID}/todos`)
      .then((res) => {
        setToDoList(res.data);
        setSearchResult(res.data.sort((a, b) => (a.id > b.id ? -1 : 1)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [renderToDo]);

  useEffect(() => {
    if (toDoList) {
      const results = toDoList.filter((obj) => {
        return obj.title.toLowerCase().includes(search.toLowerCase());
      });
      return setSearchResult(results);
    }
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
  <ToDoContext.Provider value ={{setRenderToDo, setNewButton, renderToDo, newButton}}>
    <MainContainer>
      <CardHeading>
        <h1>Welcome to Wunderlist 2.0</h1>
        <p>Please click on 'Add List' to get started.</p>
      </CardHeading>
      <ContentContainer>
        {newButton === true ? (
          <ToDoForm />
        ) : (
          <ContentAddToDo onClick={() => setNewButton(!newButton)}>
            Add List
          </ContentAddToDo>
        )}
      </ContentContainer>
      <SearchInput
        name="Search"
        placeholder="Search For A Task Title"
        onChange={handleSearch}
      />
      <ContentContainer>
        {!searchResult ? (
          <p>please hold</p>
        ) : (
          searchResult.map((obj) => {
            return (
              <DisplayCard
                type="todo"
                key={obj.id}
                id={obj.id}
                card={obj}
                userID={userID}
               />
            );
          })
        )}
      </ContentContainer>
    </MainContainer>
    </ToDoContext.Provider>
  );
};

export default Wunderlist;
