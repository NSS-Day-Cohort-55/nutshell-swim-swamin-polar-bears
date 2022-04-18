import react, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask } from "../modules/TaskManger";



export const TaskEditForm = ({ getLoggedInUser }) => {

    const [task, setTask] = useState({})
    const user = parseInt(getLoggedInUser())

    const navigate = useNavigate()
    const { taskId } = useParams()

    const handleChanges = (event) => {
        const editedTask = { ...task }

        editedTask[event.target.id] = event.target.value
        setTask(editedTask)
    }

    const handleUpdateTask = (event) => {
        event.preventDefault()
        console.log(task)
        updateTask(task)
            .then(() => navigate("/tasks"))

    }

    useEffect(() => {
        getTaskById(taskId)
            .then(task => {
                setTask(task)
            })
    }, [])





    return (
        <form>
            <h2>Edit Task</h2>
            <fieldset>
                <label htmlFor="task_name">Task Name</label>
                <input type="text" id="name" onChange={handleChanges} required autoFocus className="controlled_form" placeholder="Task name" value={task.name} />
            </fieldset>
            <fieldset>
                <label htmlFor="task_description">Task Description</label>
                <input type="text" id="description" onChange={handleChanges} required autoFocus className="controlled_form" placeholder="Task description" value={task.description} />
            </fieldset>
            <fieldset>
                <label htmlFor="completionDate"></label>
                <input type="date" id="completionDate" onChange={handleChanges} required autoFocus className="controlled_form" value={task.completionDate} />
            </fieldset>
            <button type="button" id="task_edit_submit_btn" className="submit_btn" onClick={handleUpdateTask}>Submit</button>
            <button type="button" id="task_edit_Cancel_btn" className="submit_btn" onClick={() => navigate("/tasks")}>Cancel</button>

        </form>
    )
}