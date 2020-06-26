import React from "react";
import styled from "styled-components";
import { DarkGold } from "../ColorPalette";

const EditTitle = styled.form`
  display: flex;
  align-items: center;

  input {
    display: flex;
    align-items: center;
    height: 3em;
    background: none;
    border: 1px solid ${DarkGold};
  }
`;


//makes the text box appear and runs the the saveEdit (updateToDo) function. cancel button also used to switch the setEditing to false so a user can cancel their decision

const EditTitleForm = ({
  todoToEdit,
  saveEdit,
  editing,
  setToDoToEdit,
  setEditing,
}) => {
  return (
    <>
      {editing && (
        <EditTitle onSubmit={saveEdit}>
          <label>
            <input
              onChange={(e) =>
                setToDoToEdit({ ...todoToEdit, title: e.target.value })
              }
              value={todoToEdit.title}
            />
          </label>
          <button type="submit">save</button>
          {/* <button onClick={()=>setEditing(false)}>cancel</button> */}
        </EditTitle>
      )}
    </>
  );
};

export default EditTitleForm;
