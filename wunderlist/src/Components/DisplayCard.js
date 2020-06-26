import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TaskForm from "./TaskForm";
import axiosWithAuth from "../utils/axiosWithAuth";
import {
  DarkGold,
  BurntOrange,
  DarkPurple,
  LightPurple,
} from "../ColorPalette";
import EditTitleForm from "./EditTitleForm";
import DisplayList from "./DisplayList";
import { device } from "../Breakpoints";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1%;
  height: 100%;
  min-width: 30%;
  background: ${LightPurple};
  box-shadow: 2px 2px 3px 3px ${DarkPurple};
  border-radius: 5px;
  @media ${device.laptopL} {
    width: 45%;
  }
  @media ${device.tablet} {
    width: 90%;
  }
  @media ${device.mobileM} {
    margin: 2%;
    width: 100%;
  }
  p {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    width: 20%;
    padding: 1%;
    margin: 1%;
    @media ${device.laptop} {
      width: 25%;
      font-size: 1rem;
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1%;
  h2 {
    display: flex;
    align-items: center;
    margin: 0 1%;
    min-height: 3rem;
  }
`;

const CardButton = styled.button`
  height: ${(props) => (props.button === "edit" ? "35px" : "25px")};
  width: ${(props) => (props.button === "edit" ? "35px" : "25px")};
  cursor: ${(props) => (props.button === "edit" ? "pointer" : "crosshair")};
  align-self: ${(props) =>
    props.button === "delete" ? "flex-start" : "center"};
  background-color: ${(props) =>
    props.button === "edit" ? DarkGold : BurntOrange};
  clip-path: ${(props) =>
    props.button === "edit"
      ? "polygon(92% 12%, 11% 10%, 10% 89%, 83% 91%, 35% 72%, 35% 59%, 78% 57%, 75% 42%, 41% 42%, 43% 26%, 88% 26%)"
      : "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)"};
`;

const initialToDo = {
  title: "",
  complete: false,
};

const DisplayCard = ({ card, type, userID, id, renderToDo, setRenderToDo }) => {
<<<<<<< HEAD

   // updates the to do list title. "E" button makes text box appear, replacing the title, and allowing the user to change it

=======
=======
>>>>>>> 7fbc931087c7fa2e6abea2bc97ab7e0fec8b3661
  const [editing, setEditing] = useState(false);
  const [todoToEdit, setToDoToEdit] = useState(initialToDo);
  const [task, setTask] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get(`/user/${id}/task`)
      .then((res) => {
        setTask(res.data.sort((a, b) => (a.id > b.id ? -1 : 1)));
        // console.log(res)
        return undefined;
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      return undefined;
<<<<<<< HEAD
>>>>>>> b1ff60c9c77a64742bb0a4b78fcb9a0df5535946
=======
>>>>>>> 7fbc931087c7fa2e6abea2bc97ab7e0fec8b3661
    };
  }, [renderToDo]);

  const editToDo = (cards) => {
    setEditing(!editing);
    setToDoToEdit(cards);
  };
  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/user/todos/${id}`, todoToEdit)
      .then((res) => {
        setRenderToDo(!renderToDo);
        setEditing(false);
      })
      .catch((err) => {
        console.error(err.message, err.response);
      });
  };

<<<<<<< HEAD

    //deletes the whole to do list. "X" runs the deleteToDO removing it from the server. Tried to figure out to "delete" the to do w/o doing it. 

        const deleteToDo = () => {
         axiosWithAuth()
        .delete(`user/todos/${id}`)
        .then(res => {
        setToDoToEdit(res.data);
        setRenderToDo(!renderToDo)
        // console.log(res)
        })
        .catch(err => { console.error(   
                err.message,
                err.response
            );
        }); 
=======
  const deleteToDo = () => {
    axiosWithAuth()
      .delete(`user/todos/${id}`)
      .then((res) => {
        setToDoToEdit(res.data);
        setRenderToDo(!renderToDo);
        console.log(res);
      })
      .catch((err) => {
        console.error(err.message, err.response);
      });
  };
>>>>>>> 7fbc931087c7fa2e6abea2bc97ab7e0fec8b3661

  return (
    <CardContainer>
      <CardHeader>
        <CardButton button="edit" onClick={() => editToDo(card)} />
        {editing === true ? (
          <EditTitleForm
            editing={editing}
            setEditing={setEditing}
            saveEdit={saveEdit}
            todoToEdit={todoToEdit}
            setToDoToEdit={setToDoToEdit}
          />
        ) : (
          <h2>{card.title}</h2>
        )}
        <p>
          {card.created_at !== null ? card.created_at.split("T")[0] : undefined}
        </p>
        <CardButton
          button="delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteToDo(card);
          }}
        />
      </CardHeader>
      {!task ? (
        <p>please wait</p>
      ) : (
        task.map((obj) => {
          return (
            <DisplayList
              type="task"
              key={obj.id}
              task={obj}
              id={obj.id}
              renderToDo={renderToDo}
              setRenderToDo={setRenderToDo}
            />
          );
        })
      )}
      <TaskForm
        id={id}
        renderToDo={renderToDo}
        setRenderToDo={setRenderToDo}
        userID={userID}
      />
    </CardContainer>
  );
};

export default DisplayCard;
