import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../modules/FriendManager";
import { addFriend } from "../modules/FriendManager";
// import { MessageModal } from "./MessageModal";

export const MessageCard = ({ message, handleDeleteMessage, getLoggedInUser }) => {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [click, updateClick] = useState(false)

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

  const handleAddFriend = (userObj) =>{
    const newFriend = {
      name: userObj.name,
      userId: userObj.id,
      currentUserId: getLoggedInUser()
    }
    newFriend.userId !== newFriend.currentUserId ? addFriend(newFriend).then(() => updateClick(false)) : window.alert("Cannot add friend. You have tried to add yourself or an existing friend.")
    
}

  const MessageModal = (messageObj) =>{

    return (  
        <>Add {messageObj.name} to friends? <button type="button" onClick={() => handleAddFriend(messageObj)}>Yes</button><button>No</button></>
    )
}

  return (
    <>
      <div className="card">
        <div className="card-content">
          <h3>
             <span className="card-messagename" onClick={() => click? updateClick(false) : updateClick(true)}>{click? MessageModal(currentUser) :`From: ${currentUser.name}`}</span>
          </h3>
          <h3>
            To: <span className="card-messagename">{checkPublic()}</span>
          </h3>
          <p>{message.body}</p>
          {message.currentUserId === getLoggedInUser()? <button type="button" onClick={() => handleDeleteMessage(message.id)}>Delete Message</button> : ""}
          
        </div>
      </div>
    </>
  );
};
