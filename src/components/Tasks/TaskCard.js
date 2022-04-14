import React from "react"
import { Link } from "react-router-dom";

export const TaskCard = ({ task, handleDeleteTask }) => {
  return (
    <div className="card">
      <div className="card-content">
        <picture>
          <img src={'/Taskimg.png'} alt="My Task" />
        </picture>
        <h3>Name: <span className="card-taskname">
          {task.name}
        </span></h3>
        <p>description: {task.description}</p>
        <button type="button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
        <Link to={`/tasks/${task.id}/edit`}>
          <button>Edit</button>
        </Link>
      </div>
    </div>
  );
}