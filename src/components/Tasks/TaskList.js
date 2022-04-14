import React, { useState, useEffect } from 'react';
import { TaskCard } from './TaskCard';
import { getTaskById, deleteTask } from '../modules/TaskManger';
import { useNavigate } from 'react-router-dom';

export const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate();

    const handleDeleteTask = (id) => {
        delete (id)
            .then(() => getTaskById().then(setTasks))

    };
    const getTasks = () => {
        return getTaskById()
            .then(tasks => {
                setTasks(tasks)
            })
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
   
            <section className="section-content">
                <button type="button"
                    className="btn"
                    onClick={() => { navigate("/tasks/create") }}>
                    Create Task
                </button>
            </section>
            <div className="container-cards">
                {tasks.map(task => <TaskCard
                    key={task.id}
                    task={task}
                    handleDeleteTask={handleDeleteTask} />)}
            </div>


        </>
    )
}
