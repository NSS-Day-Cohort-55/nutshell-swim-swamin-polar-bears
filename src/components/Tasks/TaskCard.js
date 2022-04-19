import React from "react"
import { Link } from "react-router-dom";
import "./TaskCard.css"

export const TaskCard = ({ task, handleDeleteTask }) => {
  return (
    
    <div className="task_container">
      <div className="task_content">
        <picture>
          <img src={'./images/Taskimg.png'} width="50" alt="My Task" />
        </picture>
        <h3><span className="card-taskname">
          {task.name}
        </span></h3>
        <p>Description: {task.description}</p>
        <p>Date Of Completion: {task.completionDate}</p>
        <button type="button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
        <Link to={`/tasks/${task.id}/edit`}>
          <button>Edit</button>
        </Link>
      </div>
    </div>
  );
}
