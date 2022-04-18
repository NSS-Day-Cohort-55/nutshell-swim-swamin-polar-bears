import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMessage } from "../modules/MessageManager";
import { getAllUsers, getUserById } from "../modules/FriendManager";

export const PrivateMessenger = ({ getLoggedInUser }) => {
  const today = new Date();

  const user = getLoggedInUser();

  const { userId } = useParams();

  const [message, setMessage] = useState({});

  const [recipient, setRecipient] = useState({});

  const navigate = useNavigate();

  const controlInput = (event) => {
    const thisMessage = {
      body: "",
      currentUserId: user,
      userId: parseInt(userId),
      timestamp: today,
    };

    let selectedTarget = event.target.value;

    thisMessage[event.target.id] = selectedTarget;
    setMessage(thisMessage);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    addMessage(message).then(() => navigate("/messages"));
  };

  useEffect(() => {
    getUserById(userId).then((r) => {
      setRecipient(r);
    });
  }, []);

  return (
    <div>
      <h2>New Message</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="userId">Recipient: </label>
          <input
            value={recipient.name}
            name="recipient"
            id="userId"
            disabled={true}
            className="controlled_form"
          ></input>
          <input
            type="hidden"
            value={recipient.userId}
            name="recipient"
            id="userId"
            className="controlled_form"
          ></input>
        </div>
      </fieldset>
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
