import React, { useState, useEffect } from 'react';
import { TaskCard } from './TaskCard';
import { getTaskById, getAllTasks, deleteTask } from '../modules/TaskManger';
import { useNavigate } from 'react-router-dom';
import "./TaskCard.css"

export const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate();

    const handleDeleteTask = (id) => {
        deleteTask(id)
            .then(() => getAllTasks().then(setTasks))

    };
    const getTasks = () => {
        return getAllTasks()
            .then(tasks => {
                setTasks(tasks)
            })
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            <div className='task_section'>
                <section className="section-content">
                    <button type="button"
                        className="task_btn"
                        onClick={() => { navigate("/tasks/create") }}>
                        Create Task
                    </button>
                    <div className="container-cards">
                        {tasks.map(task => <TaskCard
                            key={task.id}
                            task={task}
                            handleDeleteTask={handleDeleteTask} />)}
                    </div>
                </section>
            </div>


        </>
    )
}
