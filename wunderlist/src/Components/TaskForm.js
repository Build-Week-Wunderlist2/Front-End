import React, { useState } from "react";
import styled from 'styled-components'
import axiosWithAuth from "../utils/axiosWithAuth";
import * as yup from 'yup'

const TaskForm = ({ id, renderToDo, setRenderToDo }) => {
  let date = new Date().toLocaleString().split(",")[0];

  const initialTask = {
    task_id: id,
    description: "",
    complete: false,
    repeatsDaily: false,
    repeatsWeekly: false,
    repeatsMonthly: false,
    created_at: date,
  };

  const [addTask, setAddTask] = useState(initialTask);

  const saveTask = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/user/task", addTask)
      .then((res) => {
        console.log("taskform addtask", addTask);
        setRenderToDo(!renderToDo);
        setAddTask(initialTask);
        // console.log("my add task", addTask);
      })
      .catch((err) => console.error(err.message, err.response));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setAddTask({
      ...addTask,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSelection = (e) => {
    const newSelection = e.target.value;
    setAddTask({ ...addTask, [newSelection]: true });

    //possibly a conditional here to set the others back to false.
    //could also build custom component for onClicks
    //had a ton of issues with options not passing e.target.name
  };

  const TaskForms = styled.form`
    display: flex;
    justify-content: center;
    margin: 1%;
    border-radius: 15px;
  `;
  const TasksSelect= styled.select`
     background: rgba(125, 125, 125, .1);
     margin: 0 2%;
  `;

  const TasksInput = styled.input`
  
  `;
  return (
    <>
      <TaskForms onSubmit={saveTask}>
        <input
          name="description"
          onChange={handleChange}
          value={addTask.description}
          placeholder="Name of Task"
        />
        <TasksSelect onChange={(e) => handleSelection(e)}>
          <option>Repeats</option>
          <option value="repeatsDaily">Daily</option>
          <option value="repeatsWeekly">Weekly</option>
          <option value="repeatsMonthly">Monthly</option>
        </TasksSelect>
        <button type="submit">Add</button>
      </TaskForms>
    </>
  );
};

export default TaskForm;
