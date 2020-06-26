import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosWithAuth from "../utils/axiosWithAuth";

const SwitchWrapper = styled.div`
  position: relative;
  display: flex;
`;
const SwitchLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const SwitchInput = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  cursor: pointer;
  &:checked + ${SwitchLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

//sets the complete boolean to true and false based on the "switch". only id and complete are needed to be
//passed for it to work.


const Switch = ({ task, id, setRenderToDo, renderToDo }) => {
  let updatedTask = {
    id: id, 
    complete: task.complete,
  };

  const [newTask, setTask] = useState(updatedTask);

  function handleChange(e) {
    e.stopPropagation();
    setTask({ ...newTask, [e.target.name]: e.target.checked });
  }

  const updateTask = () => {
    axiosWithAuth()
      .put(`/user/task/${id}`, newTask)
      .then((res) => {
        console.log(res);
        setRenderToDo(!renderToDo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateTask();

    return undefined;
  }, [newTask]);

  return (
    <div style={{ display: "flex" }}>
      {/* <div>Complete</div> */}
      <SwitchWrapper>
        <SwitchInput
          onChange={handleChange}
          id={id}
          name="complete"
          type="checkbox"
          checked={task.complete}
        />
        <SwitchLabel htmlFor={id} />
      </SwitchWrapper>
    </div>
  );
};

export default Switch;
