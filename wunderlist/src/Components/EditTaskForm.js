import React from "react";
import styled from "styled-components";

const EditTask = styled.form`
  display: flex;
  align-content: center;
  justify-content: space-between;
  z-index: 1;
`;
const EditLabel = styled.label`
  display: flex;
  align-content: center;
  margin: 0 1%;

  input {
    border: 2px solid gold;
    font-size: 1.1rem;
  }
`;
const EditButtons = styled.button``;

const EditTaskForm = ({
  taskToEdit,
  updateTask,
  editing,
  setTaskToEdit,
  setEditing,
  deleteTask,
}) => {
  return (
    <>
      {editing && (
        <EditTask onSubmit={updateTask}>
          <button type="submit">Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>

          <EditLabel>
            <input
              onChange={(e) =>
                setTaskToEdit({ ...taskToEdit, description: e.target.value })
              }
              value={taskToEdit.description}
            />
          </EditLabel>
          <button
            button="delete"
            onClick={(e) => {
              e.preventDefault();
              deleteTask();
            }}
          >
            Delete
          </button>
        </EditTask>
      )}
    </>
  );
};

export default EditTaskForm;
