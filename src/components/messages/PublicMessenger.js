import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMessage } from "../modules/MessageManager";
import { getAllUsers, getUserById } from "../modules/FriendManager";

export const PublicMessenger = ({ getLoggedInUser }) => {
  const now = new Date();

  const [message, setMessage] = useState({
    body: "",
    userId: 0,
    currentUserId: getLoggedInUser(),
    timeStamp: now,
  });


  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const controlInput = (event) => {
    const newMessage = { ...message };

    let selectedTarget = event.target.value;

    newMessage[event.target.id] = selectedTarget;
    setMessage(newMessage);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    addMessage(message).then(() => navigate("/messages"));
  };

  useEffect(() => {
    getAllUsers().then((allUsers) => {
      setUsers(allUsers);
    });
  }, []);

  return (
    <div>
      <h2>New Message</h2>
      <fieldset>
        <div className="form-group">
          <input
            type='hidden'
            value={message.userId}
            name="recipient"
            id="userId"
            onChange={controlInput}
            className="controlled_form"
          >

          </input>
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
