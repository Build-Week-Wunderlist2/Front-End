import React, { useState, useContext } from "react";
import styled from "styled-components";
import axiosWithAuth from "../utils/axiosWithAuth";
import * as yup from "yup";

import {ToDoContext} from "../contexts/ToDoContext";

const TaskForms = styled.form`
  display: flex;
  justify-content: space-around;
  margin: 1%;
  border-radius: 15px;

  span {
    width: 50%;
    color: red;
    display: flex;
    justify-self: flex-start;
    align-items: center;
  }
`;
const TasksSelect = styled.select`
  background: rgba(125, 125, 125, 0.1);
  margin: 0 2%;
`;

const TaskForm = ({ id }) => {

  const {renderToDo, setRenderToDo} = useContext(ToDoContext);

  let date = new Date().toLocaleString().split(",")[0];
  const placeHolder = "Name of Task";

  const initialTask = {
    task_id: id,
    description: "",
    complete: false,
    repeatsDaily: false,
    repeatsWeekly: false,
    repeatsMonthly: false,
    created_at: date,
  };

    //allows user to add a new task. an option can be chosen to decide if the task wants to be run daily, weekly or, monthly

  const [addTask, setAddTask] = useState(initialTask);
  const [errors, setErrors] = useState("");


  const formSchema = yup.object().shape({
    description: yup.string().required("Include Title"),
  });

  const saveTask = (e) => {
    e.preventDefault();
    formSchema
      .validate(addTask)
      .then(() =>
        axiosWithAuth()
          .post("/user/task", addTask)
          .then((res) => {
            // console.log("taskform addtask", addTask);
            setRenderToDo(!renderToDo);
            setAddTask(initialTask);
            setErrors("");
            // console.log("my add task", addTask);
          })
          .catch((err) => console.error(err.message, err.response))
      )
      .catch((err) => setErrors(err.errors));
  };
  console.log(errors);
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

  return (
    <>
      <TaskForms onSubmit={saveTask}>
        {errors.length !== "" ? <span>{errors}</span> : undefined}
        <input
          name="description"
          onChange={handleChange}
          value={addTask.description}
          placeholder={placeHolder}
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
