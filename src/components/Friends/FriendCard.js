import React from "react";
import { Link } from "react-router-dom";

export const FriendCard = ({ friend }) => {
  console.log(friend);
  return (
    <>
      <div className="card">
        <div className="card-content">
          <h3>
            Name: <span className="card-friendname">{friend.user?.name}</span>
          </h3>
          <p>Email: {friend.user?.email}</p>
        </div>
      </div>
    </>
  );
};
