import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  deleteMessage,
  getMyMessages,
  getAllMessages,
  addMessage,
} from "../modules/MessageManager";
import { MessageCard } from "./MessageCard";

export const MessageList = ({ getLoggedInUser }) => {
  const [messages, setMessages] = useState([]);

  const thisUser = getLoggedInUser();

  const getMessages = () => {
    return getAllMessages().then((messagesFromAPI) => {
      setMessages(messagesFromAPI);
    });
  };

  const handleDeleteMessage = (id) => {
    deleteMessage(id).then(() => getMessages());
  };

  const navigate = useNavigate();

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <Link to={`/messages/new`}>
        <button>New Message</button>
      </Link>
      <div className="container-cards">
        {messages.map((message) => {
          if (
            message.userId === thisUser ||
            message.currentUserId === thisUser ||
            message.userId === 0 ||
            message.currentUserId === 0
          ) {
            return (
              <MessageCard
                key={message.id}
                message={message}
                handleDeleteMessage={handleDeleteMessage}
              />
            );
          }
        })}
      </div>
    </>
  );
};
