import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteMessage,
  getMyMessages,
  getAllMessages,
  addMessage,
} from "../modules/MessageManager";
import { MessageCard } from "./MessageCard";

export const MessageList = ({ getLoggedInUser }) => {
  const [messages, setMessages] = useState([]);

  //temporarily hard-coding logged in user. will need to fix this later

  const getMessages = () => {
    return getAllMessages(getLoggedInUser()).then((messagesFromAPI) => {
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
      <div className="container-cards">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            handleDeleteMessage={handleDeleteMessage}
          />
        ))}
      </div>
    </>
  );
};
