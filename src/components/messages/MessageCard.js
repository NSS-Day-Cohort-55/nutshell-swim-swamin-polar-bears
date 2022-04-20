import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserById, getLoggedInUser } from "../modules/FriendManager";
import { addFriend } from "../modules/FriendManager";
// import { MessageModal } from "./MessageModal";

export const MessageCard = ({
  message,
  handleDeleteMessage,
  getLoggedInUser,
}) => {
  const [currentUser, setCurrentUser] = useState({});

  const [sender, setSender] = useState({});

  const [recipient, setRecipient] = useState({});

  const [click, updateClick] = useState(false);

  useEffect(() => {
    getUserById(parseInt(getLoggedInUser())).then((aUser) => {
      setCurrentUser(aUser);
    });
  }, []);

  useEffect(() => {
    getUserById(parseInt(message.currentUserId)).then((aUser) => {
      setSender(aUser);
    });
  }, []);

  useEffect(() => {
    getUserById(parseInt(message.userId)).then((aUser) => {
      setRecipient(aUser);
    });
  }, []);

  const checkPublic = () => {
    if (recipient.name) {
      return recipient.name;
    } else {
      return "Public";
    }
  };

  const checkMessageOwner = () => {
    if (currentUser.id === sender.id) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddFriend = (userObj) => {
    const newFriend = {
      name: userObj.name,
      userId: userObj.id,
      currentUserId: getLoggedInUser(),
    };
    newFriend.userId !== newFriend.currentUserId
      ? addFriend(newFriend).then(() => updateClick(false))
      : window.alert(
          "Cannot add friend. You have tried to add yourself or an existing friend."
        );
  };

  const MessageModal = (messageObj) => {
    return (
      <>
        Add {messageObj.name} to friends?{" "}
        <button type="button" onClick={() => handleAddFriend(messageObj)}>
          Yes
        </button>
        <button>No</button>
      </>
    );
  };

  return (
    <>
      <div
        className={`card ${
          checkMessageOwner() ? "sent-card" : "received-card"
        }`}
      >
        <div className="card-content">
          <div className="message-header">
            <h3>
              <span
                className="card-messagename"
                onClick={() => (click ? updateClick(false) : updateClick(true))}
              >
                {click ? MessageModal(currentUser) : `From: ${sender.name}`}
              </span>
            </h3>
            <h3>
              To: <span className="card-messagename">{checkPublic()}</span>
            </h3>
          </div>
          <p>{message.body}</p>
          {sender.id === currentUser.id ? (
            <>
              <button
                type="button"
                onClick={() => handleDeleteMessage(message.id)}
              >
                Delete Message
              </button>{" "}
              <Link to={`/messages/edit/${message.id}`}>
                <button>Edit</button>
              </Link>
            </>
          ) : (
            <Link to={`/messages/new/${sender.id}`}>
                <button>Reply</button>
              </Link>
          )}
        </div>
      </div>
    </>
  );
};
