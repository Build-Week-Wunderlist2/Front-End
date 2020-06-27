import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";
import { device } from "../Breakpoints";
import * as yup from "yup";
import {ToDoContext} from "../contexts/ToDoContext";

const ToDoFullForm = styled.form`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${device.laptop} {
    width: 80%;
  }

  @media ${device.tablet} {
    width: 90%;
  }
`;

const ToDoFormInput = styled.input`
  border-radius: 10px;
  width: 60%;
  margin: 1%;
  height: 1.8rem;
`;

const FormError = styled.span`
  color: red;
  align-items: center;
  width: 20%;
`;

const ToDoFormButton = styled.button`
  border-radius: 10px;
  width: 20%;
`;

const ToDoForm = () => {
  const {setRenderToDo, setNewButton, renderToDo, newButton} = useContext(ToDoContext);

  let date = new Date().toLocaleString().split(",")[0];
  let userID = useParams().id;
  const initialToDo = {
    title: "",
    complete: false,
    user_id: userID,
    created_at: date,
  };

  const [addToDo, setAddToDo] = useState(initialToDo);
  const [errors, setErrors] = useState("");

  const formSchema = yup.object().shape({
    title: yup.string().required("Must Include Title"),
  });

  const saveToDo = (e) => {
    e.preventDefault();
    formSchema
      .validate(addToDo)
      .then(() => {
        axiosWithAuth()
          .post("/user/todos", addToDo)
          .then((res) => {
            setRenderToDo(!renderToDo);
            setNewButton(!newButton);
            setErrors("");
          })
          .catch((err) => console.log("error: ", err));
      })
      .catch((err) => setErrors(err.message));
  };
  console.log(errors);
  const handleChange = (e) => {
    e.persist();
    setAddToDo({ ...addToDo, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToDoFullForm onSubmit={saveToDo}>
        {errors.length !== "" ? <FormError>{errors}</FormError> : undefined}
        <ToDoFormInput
          name="title"
          onChange={handleChange}
          value={addToDo.title}
          placeholder="Name of Task"
        />
        <ToDoFormButton type="submit">Add</ToDoFormButton>
      </ToDoFullForm>
    </>
  );
};

export default ToDoForm;
