import React from "react"
import { Link } from "react-router-dom";
import "./TaskCard.css"

export const TaskCard = ({ task, handleDeleteTask }) => {
  return (
    <div className="card_content_container">
      <div className="card-content">
        <picture>
          <img src={'./images/Taskimg.png'} width="50" alt="My Task" />
        </picture>
        <h3>Name: <span className="card-taskname">
          {task.name}
        </span></h3>
        <p>description: {task.description}</p>
        <p>date: {task.completionDate}</p>
        <button type="button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
        <Link to={`/tasks/${task.id}/edit`}>
          <button>Edit</button>
        </Link>
      </div>
    </div>
  );
}
