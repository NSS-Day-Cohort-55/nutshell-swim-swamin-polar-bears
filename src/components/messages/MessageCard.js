import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../modules/FriendManager";
import { addFriend } from "../modules/FriendManager";
// import { MessageModal } from "./MessageModal";

export const MessageCard = ({ message, handleDeleteMessage }) => {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [click, updateClick] = useState(false)

  useEffect(() => {
    console.log(message.currentUserId);
    getUserById(parseInt(message.currentUserId)).then((thisUser) => {
      console.log(thisUser);
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

  const MessageModal = (messageObj) =>{

    

    const handleAddFriend = (userObj) =>{
        window.alert(userObj.name)
        addFriend(userObj)
    }
    


    return (
        
        <>Add {messageObj.name} to friends? <button type="button" onClick={handleAddFriend}>Yes</button><button>No</button></>

    )
}

  return (
    <>
      <div className="card">
        <div className="card-content">
          <h3>
            From: <span className="card-messagename" onClick={() => click? updateClick(false) : updateClick(true)}>{click? MessageModal(currentUser) : currentUser.name}</span>
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
