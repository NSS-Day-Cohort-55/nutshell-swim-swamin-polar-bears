import React from "react";
import { Link } from "react-router-dom";

export const MessageCard = ({ message, handleDeleteMessage }) => {
  return (
    <>
      <div className="card">
        <div className="card-content">
          <h3>
            Name: <span className="card-messagename">{message.user?.name}</span>
          </h3>
          <p>Email: {message.user?.email}</p>
          <button type="button" onClick={() => handleDeleteMessage(message.id)}>
          UnMessage
        </button>
        </div>
      </div>
    </>
  );
};