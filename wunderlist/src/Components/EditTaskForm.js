import React from 'react';


//makes the text box appear and runs the the updateTask function. cancel button also used to switch the setEditing to false so a user can cancel their decision

const EditTaskForm = ({taskToEdit, updateTask, editing, setTaskToEdit, setEditing}) => {
    return (<>
        {editing && (
            <form onSubmit={updateTask}>
                <label>
                    <input onChange={e=>
                    setTaskToEdit({...taskToEdit, description: e.target.value})}
                    value= {taskToEdit.description}
                    />
                </label>
                <button type="submit">save</button>
                <button onClick={()=>setEditing(false)}>cancel</button>
            </form>

        )}
        </>
    )
}

export default EditTaskForm;