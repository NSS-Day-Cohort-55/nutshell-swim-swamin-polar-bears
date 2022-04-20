import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../modules/FriendManager";
import { updateMessage, getMessageById } from "../modules/MessageManager";

export const MessageEditForm = () => {
  const [message, setMessage] = useState({ body: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [sender, setSender] = useState({});

  const { messageId } = useParams();
  const navigate = useNavigate();

  const handleFieldChange = (evt) => {
    const stateToChange = { ...message };
    stateToChange[evt.target.id] = evt.target.value;
    setMessage(stateToChange);
  };

  const updateExistingMessage = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    const editedMessage = {
      id: messageId,
      body: message.body,
      currentUserId: message.currentUserId,
      userId: message.userId,
      timeStamp: message.timeStamp,
    };

    updateMessage(editedMessage).then(() => navigate("/messages"));
  };

  useEffect(() => {
    getMessageById(messageId).then((message) => {
      setMessage(message);
      getUserById(message.currentUserId).then((user) => {
        setSender(user);
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <>
      <form className="edit_message_form">
        <h2>Edit Message</h2>
        <fieldset>
          <label className="edit_message_label" htmlFor="message_sender">Message Sender</label>
          <input
            type="text"
            id="currentUserId"
            onChange={handleFieldChange}
            required
            autoFocus
            readOnly="readOnly"
            className="edit_message_controlled_form"
            placeholder="Message Sender"
            value={sender.name}
          />
        </fieldset>
        <fieldset>
          <label className="edit_message_label" htmlFor="message_recipient">Message Recipient</label>
          <input
            type="text"
            id="userId"
            onChange={handleFieldChange}
            required
            autoFocus
            readOnly="readOnly"
            className="edit_message_controlled_form"
            placeholder="Message Recipient"
            value={message.user?.name}
          />
        </fieldset>
        <fieldset>
          <label className="edit_message_label" htmlFor="message-body">Message</label>
          <input
            type="text"
            id="body"
            onChange={handleFieldChange}
            required
            autoFocus
            className="edit_message_controlled_form"
            placeholder="Message"
            value={message.body}
          />
        </fieldset>
        <button
          type="button"
          id="message_edit_submit_btn"
          className="submit_btn"
          onClick={updateExistingMessage}
        >
          Submit
        </button>
        <button
          type="button"
          id="message_edit_Cancel_btn"
          className="cancel_btn"
          onClick={() => navigate("/messages")}
        >
          Cancel
        </button>
      </form>
    </>
  );
};
