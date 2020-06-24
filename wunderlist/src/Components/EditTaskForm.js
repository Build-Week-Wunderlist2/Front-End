import React from 'react';

const EditTaskForm = ({taskToEdit, saveTask, editing, setTaskToEdit, setEditing}) => {
    return (<>
        {editing && (
            <form onSubmit={saveTask}>
                <label>
                    <input onChange={e=>
                    setTaskToEdit({...taskToEdit, description:e.target.value})}
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