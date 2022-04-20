import React from "react";
import { Link } from "react-router-dom";
import "./FriendCard.css"

export const FriendCard = ({ friend, handleDeleteFriend , getLoggedInUser }) => {
  return (
    <>
      <div className="friend_section">
        <div className="friend_card">
          <div className="friend_name">
            <h3>
              <span className="card-friendname">{friend.user?.name}</span>
            </h3>
          </div>
          <div className="friend_body">
            <p>Email: {friend.user?.email}</p>
          </div>
          <div className="btn_container">
            <Link to={`/messages/new/${friend.user?.id}`}>
              <button id="message_btn">Message</button>
            </Link>
            <button type="button" id="unfriend_btn" onClick={() => handleDeleteFriend(friend.id)}>
              UnFriend
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
