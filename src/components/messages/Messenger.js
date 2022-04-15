import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addMessage } from "../modules/MessageManager";

export const Messenger = ({ getLoggedInUser }) => {
  const [message, setMessage] = useState({
      body: '',
      userId: 0,
      currentUserId: getLoggedInUser()
  });

  const navigate = useNavigate();

  const controlInput = (event) => {
    const newMessage = { ...message };

    let selectedTarget = event.target.value;

    // if (event.target.id.includes("Id")) {
    //   selectedTarget = parseInt(selectedTarget);
    // }
    newMessage[event.target.id] = selectedTarget;
    setMessage(newMessage);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    addMessage(message).then(() => navigate("/messages"));
  };

  return (
    <div>
      <h2>New Message</h2>
      <fieldset>
        <label htmlFor="body">Message Body: </label>
        <input
          type="text"
          id="body"
          onChange={controlInput}
          required
          autoFocus
          className="controlled_form"
          placeholder="Got something to say?"
          value={message.body}
        />
      </fieldset>
      <button
        type="button"
        id="article_submit_btn"
        className="submit_btn"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};
