import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../modules/TaskManger';
import "./TaskForm.css"

export const CreateTask= ({getLoggedInUser}) =>{

    const [Tasks, setTasks] = useState({})

    const navigate = useNavigate()

    const user = getLoggedInUser()

    const controlInput = (event) =>{
        const newTask = {...Tasks}

        newTask.userId = getLoggedInUser()

        let selectedTarget = event.target.value

        if(event.target.id.includes("Id")){
            selectedTarget = parseInt(selectedTarget)
        }
        newTask[event.target.id] = selectedTarget
        console.log(newTask)
        setTasks(newTask)
    }

    useEffect(()=>{

    },[])

    const saveTask = (event) =>{
        event.preventDefault()
        addTask(Tasks)
            .then(()=> navigate("/tasks"))

    }


    return (
        <div className='create_new_task'>
        <form>
            <h2>New Task</h2>
            <fieldset>
                <label htmlFor="name">Task Name</label>
                <input type="text" id="name" onChange={controlInput} required autoFocus className="controlled_form task_controlled_form" placeholder="task title"value={Tasks.name} />
            </fieldset>
            <fieldset>
            <label htmlFor="description">Task Description</label>
                <input type="text" id="description" onChange={controlInput} required autoFocus className="task_controlled_form controlled_form" placeholder="task description" value={Tasks.description }/>
            </fieldset>
            <fieldset>
                <label htmlFor="completionDate">Completion Date</label>
                <input type="date" id="completionDate" onChange={controlInput} required autoFocus className="task_controlled_form controlled_form" value={Tasks.completionDate} />
            </fieldset>
            <button type="button" id="task_submit_btn" className="submit_btn" onClick={saveTask}>Submit</button>

        </form>
        </div>

    )
}