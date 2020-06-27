import React, { useState, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import EditTaskForm from "./EditTaskForm";
import Switch from "./Switch";
import styled from "styled-components";

import {ToDoContext} from "../contexts/ToDoContext";

const completeBackground = "rgba(64, 86, 161, .3)";

const DisplayListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ complete }) =>
    complete ? completeBackground : undefined};
  margin: 1%;
  border-radius: 15px;
  max-height: 2em;

  p {
    width: 100%;
  }
`;

const DisplayHeaderContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`;

const DisplayListHeader = styled.h3`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 0 0 1%;
`;

const DisplayList = ({ task, id }) => {

  const {setRenderToDo, renderToDo} = useContext(ToDoContext);

  let updatedTask = {
    id: id,
    description: task.description
  };

  const [editing, setEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(updatedTask);

  const editTask = () => {
    setEditing(!editing);
  };

  //displays all the tasks in the to do list and also includes the option to update the task name by clicking the task itself.
  //also has the delete button appear only when the task name is clicked so user doesn't accidentally delete their task
  //lets user decide if they want the task to fire every day, week, or month.

  const updateTask = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/user/task/${id}`, taskToEdit)
      .then((res) => {
        setRenderToDo(!renderToDo);
        setEditing(false);
      })
      .catch((err) => {
        console.log("catch for put", taskToEdit);
        console.error(err.message, err.response);
      });
  };

  const deleteTask = () => {
    axiosWithAuth()
      .delete(`/user/task/${id}`)
      .then((res) => {
        setTaskToEdit(res.data);
        setRenderToDo(!renderToDo);
      })
      .catch((err) => {
        console.error(err.message, err.response);
      });
  };

  const taskRepeat =
    task.repeatsDaily === true
      ? "Daily"
      : task.repeatsWeekly === true
      ? "Weekly"
      : task.repeatsMonthly === true
      ? "Monthly"
      : undefined;
  return (
    <>
      <DisplayListContainer complete={task.complete}>
        <DisplayHeaderContainer>
          {editing === true ? (
            <EditTaskForm
              deleteTask={deleteTask}
              editing={editing}
              setEditing={setEditing}
              updateTask={updateTask}
              taskToEdit={taskToEdit}
              setTaskToEdit={setTaskToEdit}
              task={task}
            />
          ) : (
            <DisplayListHeader onClick={() => editTask()}>
              {task.description}
            </DisplayListHeader>
          )}
          <p>{taskRepeat}</p>
        </DisplayHeaderContainer>
        <Switch
          task={task}
          id={id}
          setRenderToDo={setRenderToDo}
          renderToDo={renderToDo}
        />
      </DisplayListContainer>
    </>
  );
};

export default DisplayList;
