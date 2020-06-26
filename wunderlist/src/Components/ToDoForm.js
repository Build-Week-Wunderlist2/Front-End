import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";
import { device } from "../Breakpoints";
import * as yup from "yup";

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

const ToDoForm = ({ setNewButton, renderToDo, setRenderToDo }) => {
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

<<<<<<< HEAD
<<<<<<< HEAD

    //allows user to add a new todo. title is needed in order for a user to add a new todo list 
    
    const saveToDo = e => {
        e.preventDefault();
=======
=======


    //allows user to add a new todo. title is needed in order for a user to add a new todo list 

>>>>>>> 7fbc931087c7fa2e6abea2bc97ab7e0fec8b3661
  const saveToDo = (e) => {
    e.preventDefault();
    formSchema
      .validate(addToDo)
      .then(() => {
<<<<<<< HEAD
>>>>>>> b1ff60c9c77a64742bb0a4b78fcb9a0df5535946
=======
>>>>>>> 7fbc931087c7fa2e6abea2bc97ab7e0fec8b3661
        axiosWithAuth()
          .post("/user/todos", addToDo)
          .then((res) => {
            setRenderToDo(!renderToDo);
            setNewButton(false);
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
