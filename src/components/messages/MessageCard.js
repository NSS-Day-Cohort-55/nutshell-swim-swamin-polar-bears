import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../modules/FriendManager";

export const MessageCard = ({ message, handleDeleteMessage }) => {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    getUserById(parseInt(message.currentUserId)).then((thisUser) => {
      setCurrentUser(thisUser);
    });
  }, []);

  const checkPublic = () => {
    if (message.user?.name) {
      return message.user?.name;
    } else {
      return "Public";
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-content">
          <h3>
            From: <span className="card-messagename">{currentUser.name}</span>
          </h3>
          <h3>
            To: <span className="card-messagename">{checkPublic()}</span>
          </h3>
          <p>{message.body}</p>
          <button type="button" onClick={() => handleDeleteMessage(message.id)}>
            Delete Message
          </button>
        </div>
      </div>
    </>
  );
};
