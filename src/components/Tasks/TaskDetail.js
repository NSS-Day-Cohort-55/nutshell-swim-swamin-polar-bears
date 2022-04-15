import React, { useState, useEffect } from "react";
import { getTaskById, deleteTask, getAllTasks } from "../modules/TaskManger.js";
import { useParams, useNavigate } from "react-router-dom";

export const TaskDetail = () => {
    const [task, setTask] = useState({ name: "", description: "" });
    const [isLoading, setIsLoading] = useState(true);

    const {taskId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllTasks(taskId)
            .then(task => {
                setTask(task);
                setIsLoading(false);
            });
    }, [taskId])

    const handleDelete = () => {
        setIsLoading(true);
        deleteTask(taskId).then(() =>
            navigate("/tasks")
        )
    };

    return (
        <section className="task">
            <h3 className="task__name">{task.name}</h3>
            <div className="task__description">{task.breed}</div>
            <div className="task__owner">Task: {task.user?.name}</div>
            <button type="button" disabled={isLoading} onClick={handleDelete}>
                Delete
            </button>
        </section>
    );

}
