import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addMessage } from "../modules/MessageManager";
import { getAllUsers } from "../modules/FriendManager";

export const Messenger = ({ getLoggedInUser }) => {
  const today = new Date();
  const fullDate = today.toISOString().split("T")[0];

  const [message, setMessage] = useState({
    body: "",
    userId: 0,
    currentUserId: getLoggedInUser(),
    timeStamp: today
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
          <label htmlFor="userId">Recipient: </label>
          <select
            value={message.userId}
            name="recipient"
            id="userId"
            onChange={controlInput}
            className="controlled_form"
          >
            <option value="0">Select a Recipient</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
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
